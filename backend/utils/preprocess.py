import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array

def preprocess_image(image, target_size=(224, 224)):
    """
    Preprocess the PIL image:
    - Resize
    - Convert to array
    - Normalize
    - Expand dims for batch
    """
    image = image.resize(target_size)
    image = img_to_array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image
