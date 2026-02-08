# 📊 Brent Oil Price Change Point Analysis  
**Statistical Modeling & Geopolitical Impact Assessment**

## 🏢 Business Overview
Birhan Energies provides data-driven strategic advice to stakeholders in the energy sector.  
This project analyzes the volatility of Brent oil prices from **1987–2022** to understand how political decisions, conflicts, international sanctions, and OPEC policy changes influence global markets.

The objective is to give **investors and policymakers quantified insights** into how specific historical **change points** have shifted the mean price level and volatility of oil.

---

## 🚀 Key Features

- **Bayesian Change Point Detection**  
  Uses Markov Chain Monte Carlo (MCMC) methods with **PyMC** to identify structural breaks in the time series.

- **Time Series Analysis**  
  Includes exploratory data analysis (EDA), stationarity testing (ADF), trend analysis, and log-return volatility clustering.

- **Event Correlation**  
  Maps statistically detected change points to a curated dataset of **10+ major geopolitical events**.

- **Interactive Dashboard**  
  A **Flask + React** web application that enables visual exploration of price shocks and Bayesian model outputs.

---

## 📁 Project Structure

```plaintext
birhan-energies-analysis/
├── data/
│   ├── raw/                 # Original Brent price CSV
│   └── processed/           # Cleaned data & event_list.csv
├── notebooks/
│   ├── 01_eda_and_research.ipynb    # Data cleaning & EDA
│   └── 02_bayesian_modeling.ipynb   # PyMC change-point model
├── backend/                 # Flask API
├── frontend/                # React dashboard
└── README.md
```

## 🛠️ Tech Stack

Language: Python 3.x

Modeling: PyMC, ArviZ

Data Analysis: Pandas, NumPy, Statsmodels

Visualization: Matplotlib, Seaborn

Web Stack: Flask (Backend), React.js (Frontend)

## 📈 Methodology

### Exploratory Data Analysis (EDA)

Visual inspection of price trends and volatility

Augmented Dickey-Fuller (ADF) test for stationarity

## Bayesian Change Point Modeling

Defined a Bayesian model where:

τ (tau) represents the change point (market regime shift date)

μ₁ is the mean price before τ

μ₂ is the mean price after τ

The model samples from the posterior distribution to infer the most probable change point and regime means.

## Validation

Model convergence checked using R-hat statistics

Trace plots used to inspect sampling behavior

### 🔧 Installation & Setup

Clone the Repository
```bash
git clone https://github.com/your-username/birhan-energies-analysis.git
cd birhan-energies-analysis
```

### Environment Setup
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Run the Analysis

Open Jupyter Notebook

Run notebooks/01_eda_and_research.ipynb

Then run notebooks/02_bayesian_modeling.ipynb

## 📝 Assumptions & Limitations

The current implementation assumes a single change point.
Multiple regime shifts would require a hierarchical or multi-change-point model.

Economic shocks may have delayed market responses.
Detected statistical breaks can lag behind real-world events.
