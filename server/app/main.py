from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route('/api/predict')
def predict():
    return jsonify({'result': 1})

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}