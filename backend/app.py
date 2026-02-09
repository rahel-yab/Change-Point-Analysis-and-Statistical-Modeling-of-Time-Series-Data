from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  

@app.route('/api/price-data', methods=['GET'])
def get_price_data():
    # Load your processed data
    df = pd.read_csv('../data/processed/brent_processed.csv')
    # Limit data to keep the chart snappy
    df_limited = df.tail(1000) 
    return jsonify(df_limited.to_dict(orient='records'))

@app.route('/api/analysis-results', methods=['GET'])
def get_analysis():
    # These would come from your PyMC summary
    results = {
        "switch_date": "2014-11-27",
        "mu1": 105.2,
        "mu2": 52.4,
        "event_detected": "OPEC Production Maintenance"
    }
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)