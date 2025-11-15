import { TrendingUp, Zap, Leaf, Heart, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import MapBase from '../MapBase';

export default function PredictiveModelling() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white mb-2">Predictive Climate Modelling</h2>
          <p className="text-cyan-200">AI-powered forecasts for urban heat stress (2024-2034)</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] rounded-2xl px-6 py-3 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Run AI Model Again
        </button>
      </div>

      {/* Prediction Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-xl rounded-3xl border border-red-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-400/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-300" />
            </div>
            <h3 className="text-white text-sm">Temp Rise</h3>
          </div>
          <div className="text-4xl text-white mb-2">+4.2°C</div>
          <div className="text-red-200 text-sm">By 2034 (worst case)</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>
            <h3 className="text-white text-sm">Energy Demand</h3>
          </div>
          <div className="text-4xl text-white mb-2">+38%</div>
          <div className="text-yellow-200 text-sm">Increased cooling load</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-xl rounded-3xl border border-green-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-400/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-white text-sm">CO₂ Reduction</h3>
          </div>
          <div className="text-4xl text-white mb-2">-22%</div>
          <div className="text-green-200 text-sm">With interventions</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-400/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-white text-sm">Health Index</h3>
          </div>
          <div className="text-4xl text-white mb-2">6.8/10</div>
          <div className="text-purple-200 text-sm">Moderate risk</div>
        </motion.div>
      </div>

      {/* Future Heat Zones Map */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-white/20 p-4">
          <h3 className="text-white">Predicted Heat Stress Zones - 2034</h3>
          <p className="text-orange-200 text-sm mt-1">Deep red areas indicate extreme heat stress zones</p>
        </div>
        <div className="h-[600px] relative">
          <MapBase>
            {/* Heat stress overlay - more intense for future predictions */}
            <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Extreme Heat Zone 1 - Central Nashik (Dark Red) */}
              <ellipse 
                cx="400" 
                cy="280" 
                rx="100" 
                ry="75" 
                fill="rgba(139, 0, 0, 0.65)"
              />
              
              {/* Extreme Heat Zone 2 - Eastern Expansion (Red) */}
              <ellipse 
                cx="550" 
                cy="200" 
                rx="80" 
                ry="65" 
                fill="rgba(220, 20, 20, 0.6)"
              />
              
              {/* High Heat Zone 1 - North (Orange-Red) */}
              <ellipse 
                cx="380" 
                cy="150" 
                rx="85" 
                ry="60" 
                fill="rgba(255, 69, 0, 0.55)"
              />
              
              {/* High Heat Zone 2 - Southwest Expansion (Orange) */}
              <ellipse 
                cx="280" 
                cy="380" 
                rx="90" 
                ry="70" 
                fill="rgba(255, 100, 0, 0.5)"
              />
              
              {/* Extreme Heat Zone 3 - Industrial South (Dark Red) */}
              <ellipse 
                cx="500" 
                cy="450" 
                rx="95" 
                ry="65" 
                fill="rgba(139, 0, 0, 0.62)"
              />
              
              {/* High Heat Zone 3 - Deolali Expansion (Orange) */}
              <ellipse 
                cx="580" 
                cy="380" 
                rx="80" 
                ry="60" 
                fill="rgba(255, 100, 0, 0.48)"
              />
            </svg>
          </MapBase>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl z-10">
            <div className="text-sm mb-2">Heat Stress Level (2034)</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded" style={{ background: 'rgb(139, 0, 0)' }} />
              <span className="text-xs">Extreme (45°C+)</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded" style={{ background: 'rgb(255, 0, 0)' }} />
              <span className="text-xs">Severe (42-45°C)</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded" style={{ background: 'rgb(255, 69, 0)' }} />
              <span className="text-xs">High (38-42°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: 'rgb(255, 140, 0)' }} />
              <span className="text-xs">Moderate (35-38°C)</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Key Findings</h3>
          <ul className="space-y-3 text-cyan-200">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Urban core expected to experience 35+ days above 42°C annually</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Industrial zones show 68% higher heat stress than baseline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Energy consumption projected to increase by 380 MW during peak summer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Heat-related health incidents may rise by 140% without intervention</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Recommended Actions</h3>
          <ul className="space-y-3 text-cyan-200">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Increase urban tree canopy to 30% by 2030</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Implement cool roof programs in high-density areas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Create 5 new urban parks with water features</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Mandate solar panels for new commercial buildings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
