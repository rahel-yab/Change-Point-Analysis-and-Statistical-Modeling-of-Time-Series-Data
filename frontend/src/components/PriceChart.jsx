import {  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const PriceChart = ({ data, switchDate }) => (
  <div className="h-96 w-full bg-white p-4 rounded-xl shadow-sm">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="Date" hide />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="Price" stroke="#0d9488" strokeWidth={2} dot={false} />
        {/* The Bayesian Switch Point detected in Task 2 */}
        <ReferenceLine x={switchDate} stroke="#ef4444" label={{ position: 'top', value: 'Switch Point', fill: '#ef4444' }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default PriceChart;