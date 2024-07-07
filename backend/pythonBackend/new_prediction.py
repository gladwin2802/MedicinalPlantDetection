import re
import tensorflow as tf
from keras.models import load_model  
from PIL import Image, ImageOps  
import numpy as np

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
# model = load_model("C:/Users/ajjos/OneDrive/Desktop/Medicinal Plant Detection/backend/pythonBackend/keras_model.h5", compile=False)
model = load_model("keras_model.h5", compile=False)
leaf_non_leaf_model = load_model('leaf_non_leaf_resnet1.h5')



# Load the labels
class_names = open("labels.txt", "r").readlines()
leaf_non_leaf_class_names = ['leaf', 'non_leaf']

# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

class Model:
    def __init__(self) -> None:
        pass

    def predict(self, model, img, class_names):
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)

        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = round(100 * np.max(predictions[0]), 2)

        return predicted_class, confidence

    def get_output(self,image_name):


        img = Image.open(image_name) 
        img = img.resize((224, 224))

        leaf_non_leaf_label, confidence = self.predict(leaf_non_leaf_model, img, leaf_non_leaf_class_names)
        print(f"Leaf/Non-Leaf Classification: {leaf_non_leaf_label}, Confidence: {confidence}%")


        if leaf_non_leaf_label == "leaf":


        # Replace this with the path to your image
            image = Image.open(image_name).convert("RGB")

            # resizing the image to be at least 224x224 and then cropping from the center
            size = (224, 224)
            image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

            # turn the image into a numpy array
            image_array = np.asarray(image)

            # Normalize the image
            normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

            # Load the image into the array
            data[0] = normalized_image_array

            # Predicts the model
            prediction = model.predict(data)
            index = np.argmax(prediction)
            class_name = class_names[index]
            class_name = re.sub(r'\W+', '', class_name)

            confidence_score = prediction[0][index]

            # Print prediction and confidence score
            print("Class:", class_name[2:], end="")
            print("Confidence Score:", confidence_score)

            return {'class':class_name[2:],'score':confidence_score}
        
        else:
            return {'class':"Invalid image",'score':confidence}




# import tensorflow as tf
# # from tensorflow.keras import layers, models
# from PIL import Image
# import numpy as np

# # Load models
# leaf_non_leaf_model = tf.keras.models.load_model('leaf_non_leaf_resnet1.h5')
# # leaf_classification_model = tf.keras.models.load_model('med_final_resnet3.h5')
# leaf_classification_model = tf.keras.models.load_model('keras_model.h5')


# # Class names for the models
# leaf_non_leaf_class_names = ['leaf', 'non_leaf']
# leaf_classification_class_names = ['Adathodai', 'Aloevera', 'Bringaraja', 'Lemon', 'Neem']

# # Prediction function
# def predict(model, img, class_names):
#     img_array = tf.keras.preprocessing.image.img_to_array(img)
#     img_array = tf.expand_dims(img_array, 0)

#     predictions = model.predict(img_array)
#     predicted_class = class_names[np.argmax(predictions[0])]
#     confidence = round(100 * np.max(predictions[0]), 2)

#     return predicted_class, confidence

# # Function to get output
# def get_output(image_path):
#     # img = Image.open(image_path).convert("RGB")  # Ensure image is in RGB format
#     img = Image.open(image_path) 
#     img = img.resize((224, 224))

#     leaf_non_leaf_label, confidence = predict(leaf_non_leaf_model, img, leaf_non_leaf_class_names)
#     print(f"Leaf/Non-Leaf Classification: {leaf_non_leaf_label}, Confidence: {confidence}%")
    
#     if leaf_non_leaf_label == "leaf":
#         leaf_classification_label, confidence = predict(leaf_classification_model, img, leaf_classification_class_names)
#         print(f"Leaf Classification: {leaf_classification_label}, Confidence: {confidence}%")
#         return {'class': leaf_classification_label, 'score': confidence}
#     else:
#         print("The image is classified as non-leaf.")
#         return {'class': 'non_leaf', 'score': confidence}





# import re
# from keras.models import load_model  
# from PIL import Image, ImageOps  
# import numpy as np

# # Disable scientific notation for clarity
# np.set_printoptions(suppress=True)

# # Load the model
# # model = load_model("keras_Model.h5", compile=False)
# # model = load_model("med_final_resnet3.h5", compile=False)
# # Load models
# leaf_non_leaf_model = load_model('./leaf_non_leaf_resnet1.h5', compile=False)
# leaf_classification_model = load_model('./keras_model.h5', compile=False)

# # # Load the labels
# class_names = open("labels.txt", "r").readlines()

# # Class names for the two models
# # leaf_non_leaf_classes = ['leaf', 'non_leaf']
# # leaf_classes = ['Adathodai', 'Aloevera', 'Bringaraja', 'Lemon', 'Neem']

# # Create the array of the right shape to feed into the keras model
# # The 'length' or number of images you can put into the array is
# # determined by the first position in the shape tuple, in this case 1
# data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

# class Model:
#     def __init__(self) -> None:
#         pass
#     def get_output(self,image_name):
#     # Replace this with the path to your image
#         image = Image.open(image_name).convert("RGB")

#         # resizing the image to be at least 224x224 and then cropping from the center
#         size = (224, 224)
#         image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

#         # turn the image into a numpy array
#         image_array = np.asarray(image)

#         # Normalize the image
#         normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

#         # Load the image into the array
#         data[0] = normalized_image_array

#         # Predicts the model
#         prediction = model.predict(data)
#         index = np.argmax(prediction)
#         class_name = class_names[index]
#         class_name = re.sub(r'\W+', '', class_name)

#         confidence_score = prediction[0][index]

#         # Print prediction and confidence score
#         print("Class:", class_name[2:], end="")
#         print("Confidence Score:", confidence_score)

#         return {'class':class_name[2:],'score':confidence_score}
    


