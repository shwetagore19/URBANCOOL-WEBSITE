import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const monthlyData = [
  { month: 'Jan', temp: 28, energy: 120, carbon: 450 },
  { month: 'Feb', temp: 30, energy: 125, carbon: 470 },
  { month: 'Mar', temp: 34, energy: 135, carbon: 500 },
  { month: 'Apr', temp: 37, energy: 145, carbon: 530 },
  { month: 'May', temp: 39, energy: 160, carbon: 550 },
  { month: 'Jun', temp: 38, energy: 155, carbon: 540 },
  { month: 'Jul', temp: 35, energy: 140, carbon: 510 },
  { month: 'Aug', temp: 33, energy: 130, carbon: 490 },
];

const zoneData = [
  { zone: 'Central', score: 8.5, color: '#ef4444' },
  { zone: 'Industrial', score: 9.2, color: '#f97316' },
  { zone: 'Residential', score: 6.8, color: '#f59e0b' },
  { zone: 'Green', score: 4.2, color: '#22c55e' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white mb-2">Analytics & Reports</h2>
          <p className="text-cyan-200">Comprehensive climate data analysis for Nashik</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] rounded-2xl px-6 py-3 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export PDF Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl border border-red-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-400/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-300" />
            </div>
          </div>
          <div className="text-sm text-red-200 mb-1">Peak Temperature</div>
          <div className="text-3xl text-white">39.2°C</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-300" />
            </div>
          </div>
          <div className="text-sm text-yellow-200 mb-1">Energy Consumption</div>
          <div className="text-3xl text-white">160 MW</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-400/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-300" />
            </div>
          </div>
          <div className="text-sm text-purple-200 mb-1">CO₂ Emissions</div>
          <div className="text-3xl text-white">550 tons</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl border border-blue-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-400/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-300" />
            </div>
          </div>
          <div className="text-sm text-blue-200 mb-1">Report Period</div>
          <div className="text-3xl text-white">8 months</div>
        </motion.div>
      </div>

      {/* Temperature & Energy Trend */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-6">Temperature & Energy Consumption Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#a5f3fc" />
              <YAxis yAxisId="left" stroke="#f97316" />
              <YAxis yAxisId="right" orientation="right" stroke="#eab308" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 22, 40, 0.9)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temp"
                stroke="#f97316"
                strokeWidth={3}
                name="Temperature (°C)"
                dot={{ fill: '#f97316', r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="energy"
                stroke="#eab308"
                strokeWidth={3}
                name="Energy (MW)"
                dot={{ fill: '#eab308', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-6">Heat Stress by Zone</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="zone" stroke="#a5f3fc" />
                <YAxis stroke="#a5f3fc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 22, 40, 0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="score" name="UHI Index">
                  {zoneData.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="score" fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-6">Carbon Emissions by Month</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
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
                <Bar dataKey="carbon" fill="#8b5cf6" name="Carbon (tons)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Report */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-4">Executive Summary</h3>
        <div className="space-y-4 text-cyan-200">
          <p>
            Analysis period: January - August 2024. Nashik experienced significant urban heat stress
            with peak temperatures reaching 39.2°C in May, representing a 3.8°C increase from the
            10-year average.
          </p>
          <p>
            Energy consumption peaked at 160 MW during summer months, correlating directly with
            increased cooling demands. Carbon emissions followed a similar trend, reaching 550 tons
            in May.
          </p>
          <p>
            The Industrial zone showed the highest heat stress (UHI Index: 9.2), followed by Central
            (8.5) and Residential (6.8) areas. Green zones maintained lower stress levels (4.2),
            demonstrating the cooling effect of vegetation.
          </p>
          <p>
            Recommendations include expanding tree canopy coverage to 30%, implementing cool roof
            programs in high-stress zones, and establishing urban parks with water features to
            mitigate heat island effects.
          </p>
        </div>
      </div>
    </div>
  );
}
