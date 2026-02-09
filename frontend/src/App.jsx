import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import PriceChart from './components/PriceChart';
import { TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [analysis, setAnalysis] = useState({ switch_date: '...', mu1: 0, mu2: 0 });

  useEffect(() => {
    // Replace with your actual Flask API calls
    const fetchData = async () => {
      // Example data structure
      setEvents([
        { Date: '2022-02-24', Event: 'Invasion of Ukraine' },
        { Date: '2020-03-11', Event: 'COVID-19 Crash' },
        { Date: '2014-11-27', Event: 'OPEC Price War' }
      ]);
      setAnalysis({ switch_date: '2014-11-27', mu1: 108.5, mu2: 48.2, event: 'OPEC Policy Shift' });
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar events={events} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Intelligence</h2>
            <p className="text-gray-500">Bayesian Structural Break Analysis</p>
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
            Export Report
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Key Switch Point" value={analysis.switch_date} icon={Calendar} colorClass="bg-blue-500" />
          <StatCard title="Price Impact" value={`$${analysis.mu1} → $${analysis.mu2}`} icon={TrendingUp} colorClass="bg-teal-500" trend="-55.6%" />
          <StatCard title="Primary Driver" value={analysis.event} icon={AlertTriangle} colorClass="bg-orange-500" />
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Brent Crude Price Regime Shift</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> Price
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Bayesian Tau
              </span>
            </div>
          </div>
          <PriceChart data={data} switchDate={analysis.switch_date} />
        </div>
      </main>
    </div>
  );
}

export default App;