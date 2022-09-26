from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)

CORS(app, resousces={r"/*": {"origins": "*"}})

@app.route('/api/predict')
def predict():
    return jsonify({'result': 2})

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)