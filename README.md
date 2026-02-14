# 📊 Market Intelligence: Brent Oil Change Point Analysis
**Bayesian Statistical Modeling & Geopolitical Impact Assessment Dashboard**

## 🏢 Business Overview
Developed for **Birhan Energies**, this platform provides data-driven strategic advice for the energy sector. Global energy markets are highly sensitive to geopolitical shifts; this project quantifies that sensitivity by analyzing Brent oil price volatility from **1987–2022**.

The system identifies "Structural Breaks"—moments where the market regime shifted fundamentally due to conflicts, OPEC policy changes, or global economic shocks—giving investors and policymakers quantified insights into historical market behavior.

---

## 🚀 Key Features

- **Interactive Bayesian Analysis**: Upload custom `.csv` price data to trigger real-time statistical analysis of market regimes.
- **Change Point Detection**: Utilizes **PyMC** (Markov Chain Monte Carlo) to infer the most probable date of a market shift ($\tau$).
- **Regime Comparison**: Automatically calculates and compares mean price levels ($\mu_1$ vs $\mu_2$) before and after detected events.
- **Geopolitical Mapping**: Correlates statistical anomalies with major global events (e.g., OPEC shifts, Pandemic impacts, Supply shocks).
- **Hybrid Cloud Deployment**: Optimized performance using a split-stack architecture (React on Vercel, Flask/PyMC on Render).

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Axios, Lucide React (Icons).
- **Backend**: Flask (Python), Gunicorn.
- **Modeling & Data Science**: 
  - **PyMC**: Bayesian modeling and MCMC sampling.
  - **ArviZ**: Exploratory analysis of Bayesian models.
  - **Pandas/NumPy**: Data manipulation.
  - **Statsmodels**: ADF stationarity testing.
- **Deployment**: 
  - **Vercel**: Frontend hosting (optimized for Vite).
  - **Render**: Dockerized backend environment for persistent Python services.

---

## 📈 Methodology

### 1. Bayesian Structural Break Model
The core analysis treats the change point as a random variable $\tau$. The model is defined as:
- **Prior for $\tau$**: A discrete uniform distribution across the entire time series.
- **Priors for $\mu$**: Exponential distributions representing the mean price before and after the break.
- **Likelihood**: The observed prices are modeled as a Poisson or Normal distribution (depending on the data transformation).



### 2. Statistical Validation
- **Stationarity**: Augmented Dickey-Fuller (ADF) tests are used to determine if the series requires log-return transformation.
- **Convergence**: Model health is verified using **R-hat** statistics and trace plot inspection to ensure sampling stability.

---

## 📁 Project Structure

```plaintext
change-point-analysis/
├── backend/                # Flask API & Bayesian Logic
│   ├── data/               # Processed datasets (CSV)
│   ├── app.py              # Flask API Entry point
│   ├── __init__.py         # Package marker
│   └── requirements.txt    # Python dependencies
├── frontend/               # React Dashboard
│   ├── src/
│   │   ├── api/            # Axios API configuration
│   │   ├── components/     # UI StatCards, Sidebar, PriceCharts
│   │   └── App.jsx         # Main Dashboard logic
│   └── package.json        # Node.js dependencies
├── notebooks/              # Research & PyMC Model Prototyping
├── Dockerfile              # Backend containerization
├── vercel.json             # Frontend deployment config
└── README.md               # Project documentation
```

--- 

## 🔧 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rahel-yab/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data.git
cd change-point-analysis
```

### 2. Backend Setup (Python)
```Bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
### 3. Frontend Setup (React/Vite)
```Bash
cd ../frontend
npm install
npm run dev
```
---

## 🤝 Contribution Guidelines

Contributions are welcome. To contribute:

- Fork the Project

- Create your Feature Branch (git checkout -b feature/new_feature)

- Commit your Changes (git commit -m 'Add some new_feature')

- Push to the Branch (git push origin feature/new_feature)

- Open a Pull Request
