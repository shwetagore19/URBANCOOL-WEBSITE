import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, AlertCircle, TreePine } from 'lucide-react';

const historicalData = [
  { month: 'Jan', emissions: 450 },
  { month: 'Feb', emissions: 420 },
  { month: 'Mar', emissions: 480 },
  { month: 'Apr', emissions: 510 },
  { month: 'May', emissions: 490 },
  { month: 'Jun', emissions: 530 },
];

export default function CarbonCredit() {
  const [emissions, setEmissions] = useState('500');

  const emissionsValue = parseFloat(emissions) || 0;
  const creditsNeeded = emissionsValue * 1.2;
  const creditCost = creditsNeeded * 15;
  const fines = emissionsValue > 400 ? (emissionsValue - 400) * 25 : 0;
  const offsetProjects = Math.ceil(emissionsValue / 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Carbon Credit Calculator</h2>
        <p className="text-cyan-200">Calculate your carbon footprint and explore offset options</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-3">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <label className="block text-white mb-3">Total CO₂ Emissions (tons)</label>
            <input
              type="number"
              value={emissions}
              onChange={(e) => setEmissions(e.target.value)}
              placeholder="Enter emissions..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* Result Cards */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-xl rounded-3xl border border-cyan-400/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 flex items-center justify-center">
              <span className="text-cyan-300 text-xl">Rs.</span>
            </div>
            <h3 className="text-white">Buy Carbon Credits</h3>
          </div>
          <div className="text-4xl text-white mb-2">{creditsNeeded.toFixed(1)}</div>
          <div className="text-cyan-200 mb-4">credits needed</div>
          <div className="text-2xl text-cyan-300">Rs.{creditCost.toFixed(2)}</div>
          <div className="text-cyan-200 text-sm">Total cost at Rs.15/credit</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-xl rounded-3xl border border-orange-400/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-400/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-300" />
            </div>
            <h3 className="text-white">Regulatory Fines</h3>
          </div>
          <div className="text-4xl text-white mb-2">Rs.{fines.toFixed(2)}</div>
          <div className="text-orange-200 mb-4">potential penalties</div>
          <div className="text-sm text-orange-200">
            {fines > 0 ? 'Above regulatory threshold' : 'Within compliance limits'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-xl rounded-3xl border border-green-400/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-400/20 flex items-center justify-center">
              <TreePine className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-white">Offset via Projects</h3>
          </div>
          <div className="text-4xl text-white mb-2">{offsetProjects}</div>
          <div className="text-green-200 mb-4">reforestation projects</div>
          <div className="text-sm text-green-200">Each offsets ~100 tons CO₂</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-4">Emissions Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#a5f3fc" />
              <YAxis stroke="#a5f3fc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 22, 40, 0.9)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="emissions"
                stroke="#2dd4bf"
                strokeWidth={3}
                dot={{ fill: '#2dd4bf', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-6">
        <h4 className="text-white mb-2">💡 Pro Tip</h4>
        <p className="text-purple-100">
          Investing in renewable energy and urban forestry can reduce emissions by up to 40% while
          generating long-term carbon credits.
        </p>
      </div>
    </div>
  );
}