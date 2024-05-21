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
    result = None
    if request.method == "POST":
        file = request.files["image"]
        file.save(f"static/{file.filename}")
        print("File saved successfully !!!")
        result = model__.get_output(f"static/{file.filename}")
        os.remove(f"static/{file.filename}")
        result["score"] = float(result["score"])
        print(result)
        return jsonify(result=result)

app.run(debug=True, port=5070)
