from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Helper to load initial data
@app.route('/api/price-data', methods=['GET'])
def get_price_data():
    try:
        df = pd.read_csv('../data/processed/brent_processed.csv')
        return jsonify(df.tail(1000).to_dict(orient='records'))
    except:
        return jsonify([])

@app.route('/api/analysis-results', methods=['GET'])
def get_analysis():
    return jsonify({
        "switch_date": "2014-11-27",
        "mu1": 108.5,
        "mu2": 48.2,
        "event_detected": "OPEC Policy Shift"
    })

@app.route('/api/upload-analyze', methods=['POST'])
def upload_and_analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file"}), 400
    
    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Load the user's data
    df = pd.read_csv(filepath)
    
    # MOCK ANALYSIS LOGIC (Replace this with your actual PyMC model call)
    # Here we are simulating the model finding a switch point in the user data
    results = {
        "switch_date": "02-Feb-05", 
        "mu1": round(df['Price'].iloc[0:10].mean(), 2),
        "mu2": round(df['Price'].iloc[-10:].mean(), 2),
        "event_detected": "User Data Analysis Complete",
        "chart_data": df.tail(1000).to_dict(orient='records'),
        "events": [
            { "Date": "2022-02-24", "Event": "Supply Shock" },
            { "Date": "2020-03-11", "Event": "Pandemic Impact" },
            { "Date": "2005-02-02", "Event": "Custom Data Start" }
        ]
    }
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)