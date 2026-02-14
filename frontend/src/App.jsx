import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import PriceChart from './components/PriceChart';
import { TrendingUp, Calendar, AlertTriangle, Upload, Loader2 } from 'lucide-react';
// Import the API functions from your api/index.js
import { fetchPrices, fetchAnalysis, uploadAndAnalyze } from './api'; 

function App() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [analysis, setAnalysis] = useState({ 
    switch_date: '...', 
    mu1: 0, 
    mu2: 0, 
    event_detected: 'Awaiting Data...' 
  });
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadInitialDashboard();
  }, []);

  const loadInitialDashboard = async () => {
    try {
      setLoading(true);
      // Using your Axios-wrapped functions
      const [priceRes, analysisRes] = await Promise.all([
        fetchPrices(),
        fetchAnalysis()
      ]);

      setData(priceRes.data); // Axios uses .data
      setAnalysis(analysisRes.data);
      
      // Default events for the initial landing view
      setEvents([
        { Date: '2022-02-24', Event: 'Invasion of Ukraine' },
        { Date: '2020-03-11', Event: 'COVID-19 Crash' },
        { Date: '2014-11-27', Event: 'OPEC Price War' }
      ]);
    } catch (err) {
      console.error("Backend unreachable. Is Render spinning up?", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      // Using your exported Axios POST function
      const response = await uploadAndAnalyze(formData);
      const result = response.data;
      
      setAnalysis({
        switch_date: result.switch_date,
        mu1: result.mu1,
        mu2: result.mu2,
        event_detected: result.event_detected
      });
      setData(result.chart_data);
      setEvents(result.events || []);

    } catch (error) {
      alert("Analysis failed. Please check file format or server status.");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar events={events} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Intelligence</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              {loading && <Loader2 className="animate-spin" size={16} />}
              <span>{loading ? "Waking up Bayesian Brain..." : "Bayesian Structural Break Analysis"}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".csv" 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
            >
              <Upload size={18} /> Upload CSV
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
              Export Report
            </button>
          </div>
        </header>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Key Switch Point" value={analysis.switch_date} icon={Calendar} colorClass="bg-blue-500" />
          <StatCard 
            title="Price Impact" 
            value={`$${analysis.mu1} → $${analysis.mu2}`} 
            icon={TrendingUp} 
            colorClass="bg-teal-500" 
            trend={analysis.mu1 > 0 ? `${(((analysis.mu2 - analysis.mu1) / analysis.mu1) * 100).toFixed(1)}%` : "0%"} 
          />
          <StatCard title="Primary Driver" value={analysis.event_detected} icon={AlertTriangle} colorClass="bg-orange-500" />
        </div>

        {/* Visualization Area */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-800 text-lg">Price Regime Visualization</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span className="w-3 h-3 rounded-full bg-teal-500"></span> Price History
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Bayesian Tau
              </span>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            {data.length > 0 ? (
              <PriceChart data={data} switchDate={analysis.switch_date} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                {loading ? "Processing..." : "No data available. Please upload a CSV."}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;