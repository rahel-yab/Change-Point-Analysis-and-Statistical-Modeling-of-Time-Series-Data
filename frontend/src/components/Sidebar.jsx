import React from 'react';
import { ShieldAlert, Globe, Zap, History } from 'lucide-react';

const Sidebar = ({ events }) => (
  <aside className="w-80 bg-white border-r border-gray-100 h-screen overflow-y-auto p-6 hidden lg:block">
    <div className="flex items-center gap-2 mb-10">
      <Zap className="text-teal-600" fill="currentColor" size={28} />
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">Birhan Analytics</h1>
    </div>
    
    <nav className="space-y-8">
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <History size={14} /> Critical Events
        </h2>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="group cursor-pointer">
              <p className="text-xs text-gray-400 font-mono">{event.Date}</p>
              <h4 className="text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
                {event.Event}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </nav>
  </aside>
);

export default Sidebar;