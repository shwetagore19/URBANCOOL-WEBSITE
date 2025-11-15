import { useState } from 'react';
import { Thermometer, Leaf as LeafIcon, Factory } from 'lucide-react';
import MapBase from '../MapBase';

export default function HeatMap() {
  const [selectedCity, setSelectedCity] = useState('Nashik');
  const [showUHI, setShowUHI] = useState(true);
  const [showCanopy, setShowCanopy] = useState(false);
  const [showEmissions, setShowEmissions] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-white">Heat Map Module</h2>
        
        {/* City Selector */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="Nashik">Nashik, Maharashtra</option>
          <option value="Mumbai">Mumbai, Maharashtra</option>
          <option value="Pune">Pune, Maharashtra</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toggle Controls */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-4 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={showUHI}
                onChange={(e) => setShowUHI(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-400"
              />
              <span>UHI Heat Overlay</span>
            </label>
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={showCanopy}
                onChange={(e) => setShowCanopy(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-400"
              />
              <span>Tree Canopy</span>
            </label>
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={showEmissions}
                onChange={(e) => setShowEmissions(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-400"
              />
              <span>Emissions</span>
            </label>
          </div>

          {/* Map */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden h-[600px] relative">
            <MapBase>
              {/* Heat Overlay - Transparent with Orange (Hot) and Yellow (Moderate) zones */}
              {showUHI && (
                <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Hot Zone 1 - Central Nashik (Orange) */}
                  <ellipse 
                    cx="400" 
                    cy="280" 
                    rx="80" 
                    ry="60" 
                    fill="rgba(255, 140, 0, 0.5)"
                    className="transition-opacity duration-300"
                  />
                  
                  {/* Hot Zone 2 - Eastern District (Orange) */}
                  <ellipse 
                    cx="550" 
                    cy="200" 
                    rx="60" 
                    ry="50" 
                    fill="rgba(255, 140, 0, 0.45)"
                  />
                  
                  {/* Moderate Zone 1 - North Area (Yellow) */}
                  <ellipse 
                    cx="380" 
                    cy="150" 
                    rx="70" 
                    ry="50" 
                    fill="rgba(255, 220, 0, 0.4)"
                  />
                  
                  {/* Moderate Zone 2 - Southwest (Yellow) */}
                  <ellipse 
                    cx="280" 
                    cy="380" 
                    rx="65" 
                    ry="55" 
                    fill="rgba(255, 220, 0, 0.38)"
                  />
                  
                  {/* Hot Zone 3 - South Industrial (Orange) */}
                  <ellipse 
                    cx="500" 
                    cy="450" 
                    rx="75" 
                    ry="50" 
                    fill="rgba(255, 140, 0, 0.48)"
                  />
                  
                  {/* Moderate Zone 3 - Deolali Area (Yellow) */}
                  <ellipse 
                    cx="580" 
                    cy="380" 
                    rx="60" 
                    ry="45" 
                    fill="rgba(255, 220, 0, 0.35)"
                  />
                </svg>
              )}

              {/* Canopy Overlay */}
              {showCanopy && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Green areas near water bodies */}
                  <div className="absolute top-[25%] left-[15%] w-28 h-28 bg-green-500/40 rounded-full blur-xl" />
                  <div className="absolute top-[60%] left-[20%] w-32 h-32 bg-green-500/40 rounded-full blur-xl" />
                  <div className="absolute top-[35%] left-[8%] w-24 h-24 bg-green-500/35 rounded-full blur-xl" />
                </div>
              )}

              {/* Emissions Overlay */}
              {showEmissions && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Industrial areas */}
                  <div className="absolute bottom-[25%] right-[20%] w-40 h-32 bg-purple-500/30 rounded-full blur-2xl" />
                  <div className="absolute top-[48%] left-[50%] w-32 h-28 bg-purple-500/25 rounded-full blur-2xl" />
                </div>
              )}

              {/* Hotspot Markers with realistic positioning */}
              <div className="absolute top-[47%] left-[50%]" title="City Center - Peak Temperature">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500/30 rounded-full animate-ping" />
              </div>
              <div className="absolute top-[33%] left-[69%]" title="Ojhar Industrial - High Heat">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg" />
              </div>
              <div className="absolute top-[75%] left-[62%]" title="Southern Industrial Zone">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse shadow-lg" />
              </div>
            </MapBase>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl z-10">
              <div className="text-sm mb-2">Heat Index</div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded" style={{ background: 'rgb(255, 0, 0)' }} />
                <span className="text-xs">Very High (40°C+)</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded" style={{ background: 'rgb(255, 100, 0)' }} />
                <span className="text-xs">High (35-40°C)</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded" style={{ background: 'rgb(255, 200, 0)' }} />
                <span className="text-xs">Moderate (30-35°C)</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded" style={{ background: 'rgb(0, 255, 0)' }} />
                <span className="text-xs">Low (25-30°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ background: 'rgb(0, 100, 255)' }} />
                <span className="text-xs">Cool (20-25°C)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="w-6 h-6 text-red-400" />
              <span className="text-white">Avg Temperature</span>
            </div>
            <div className="text-3xl text-white">36.2°C</div>
            <div className="text-cyan-200 text-sm mt-1">+2.4°C from normal</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="w-6 h-6 text-orange-400" />
              <span className="text-white">UHI Index</span>
            </div>
            <div className="text-3xl text-white">4.8</div>
            <div className="text-cyan-200 text-sm mt-1">Severe heat island</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <LeafIcon className="w-6 h-6 text-green-400" />
              <span className="text-white">Canopy Coverage</span>
            </div>
            <div className="text-3xl text-white">12.4%</div>
            <div className="text-cyan-200 text-sm mt-1">Below optimal</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Factory className="w-6 h-6 text-purple-400" />
              <span className="text-white">Energy Stress</span>
            </div>
            <div className="text-3xl text-white">High</div>
            <div className="text-cyan-200 text-sm mt-1">Peak demand +28%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
