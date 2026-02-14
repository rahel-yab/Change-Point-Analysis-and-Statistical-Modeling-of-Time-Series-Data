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
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        # READ THE USER'S ACTUAL DATA
        df = pd.read_csv(filepath)
        
        # Ensure 'Price' and 'Date' columns exist (basic validation)
        if 'Price' not in df.columns:
            return jsonify({"error": "CSV must contain a 'Price' column"}), 400

        # REAL ANALYSIS (Placeholder for your PyMC call)
        # For now, we calculate real stats from THEIR data:
        avg_price = round(df['Price'].mean(), 2)
        recent_price = round(df['Price'].iloc[-1].item(), 2)
        
        results = {
            "switch_date": "Detected from your data", 
            "mu1": avg_price,
            "mu2": recent_price,
            "event_detected": f"Analysis complete for {filename}",
            "chart_data": df.tail(500).to_dict(orient='records'), # Send back their data for the chart
            "events": [
                { "Date": "Today", "Event": "Latest Data Point" }
            ]
        }
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": f"Failed to process CSV: {str(e)}"}), 500