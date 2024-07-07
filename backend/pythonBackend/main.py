

from flask import Flask, render_template
from flask import request, jsonify
from flask_cors import CORS
from new_prediction import Model
import os

app = Flask(__name__)
model__ = Model()
CORS(app)

@app.route("/")
def index():
    return "Flask Server is running"

@app.route("/connect")
def connect():
    return "Connected to Flask Server"

@app.route("/upload", methods=["POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["image"]
        file_path = f"static/{file.filename}"
        file.save(file_path)
        print("File saved successfully !!!")
        result = model__.get_output(file_path)
        os.remove(file_path)
        result["score"] = float(result["score"])
        print(result)
        return jsonify(result=result)

if __name__ == "__main__":
    app.run(debug=True, port=5070)


# from flask import Flask, render_template
# from flask import request, jsonify
# from flask_cors import CORS
# from new_prediction import Model
# import os

# app = Flask(__name__)
# model__ = Model()
# CORS(app)

# @app.route("/")
# def index():
#     return "Flask Server is running"

# @app.route("/connect")
# def connect():
#     return "Connected to Flask Server"

# @app.route("/upload", methods=["POST"])
# def upload_file():
#     result = None
#     if request.method == "POST":
#         file = request.files["image"]
#         file.save(f"static/{file.filename}")
#         print("File saved successfully !!!")
#         result = model__.get_output(f"static/{file.filename}")
#         os.remove(f"static/{file.filename}")
#         result["score"] = float(result["score"])
#         print(result)
#         return jsonify(result=result)

# app.run(debug=True, port=5070)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# from new_prediction import get_output

# app = Flask(__name__)
# CORS(app)

# @app.route("/")
# def index():
#     return "Flask Server is running"

# @app.route("/connect")
# def connect():
#     return "Connected to Flask Server"

# @app.route("/upload", methods=["POST"])
# def upload_file():
#     result = None
#     if request.method == "POST":
#         file = request.files["image"]
#         file.save(f"static/{file.filename}")
#         print("File saved successfully !!!")
#         result = get_output(f"static/{file.filename}")
#         os.remove(f"static/{file.filename}")
#         result["score"] = float(result["score"])
#         print(result)
#         return jsonify(result=result)

# app.run(debug=True, port=5070)
