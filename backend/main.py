from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import numpy as np
from PIL import Image
import requests
import io
import json
from utils.preprocess import preprocess_image

app = FastAPI()

# Allow frontend access (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load class mapping (e.g., 0: "Healthy", ...)
with open("models/class_mapping.json", "r") as f:
    class_mapping = json.load(f)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        img_array = preprocess_image(image)

        # Prepare request for TensorFlow Serving
        data = {
            "signature_name": "serving_default",
            "instances": img_array.tolist()
        }

        tf_serving_url = "http://localhost:8501/v1/models/tomato_model:predict"
        response = requests.post(tf_serving_url, json=data)

        if response.status_code != 200:
            return JSONResponse(status_code=500, content={"error": "Model error"})

        predictions = np.array(response.json()["predictions"])[0]
        predicted_index = int(np.argmax(predictions))
        confidence = float(np.max(predictions))

        return {
            "label": class_mapping[str(predicted_index)],
            "confidence": confidence
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
