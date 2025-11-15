import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import MapBase from '../MapBase';

export default function HistoricalComparison() {
  const [leftYear, setLeftYear] = useState('2014');
  const [rightYear, setRightYear] = useState('2024');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const years = ['2004', '2009', '2014', '2019', '2024'];

  const getHeatIntensity = (year: string) => {
    const yearNum = parseInt(year);
    if (yearNum <= 2004) return 0.3;
    if (yearNum <= 2009) return 0.35;
    if (yearNum <= 2014) return 0.4;
    if (yearNum <= 2019) return 0.45;
    return 0.5;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Historical Temperature Comparison</h2>
        <p className="text-cyan-200">Compare urban heat patterns across different time periods</p>
      </div>

      {/* Year Selectors */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <label className="block text-white mb-3">Left Panel - Historical Year</label>
          <select
            value={leftYear}
            onChange={(e) => setLeftYear(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <div className="mt-4 text-cyan-200 text-sm">
            Avg Temperature: {leftYear === '2014' ? '32.8°C' : leftYear === '2009' ? '31.5°C' : leftYear === '2004' ? '30.2°C' : leftYear === '2019' ? '34.1°C' : '36.2°C'}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <label className="block text-white mb-3">Right Panel - Comparison Year</label>
          <select
            value={rightYear}
            onChange={(e) => setRightYear(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <div className="mt-4 text-cyan-200 text-sm">
            Avg Temperature: {rightYear === '2014' ? '32.8°C' : rightYear === '2009' ? '31.5°C' : rightYear === '2004' ? '30.2°C' : rightYear === '2019' ? '34.1°C' : '36.2°C'}
          </div>
        </div>
      </div>

      {/* Split Screen Comparison */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-white/20 p-4 flex items-center justify-between">
          <h3 className="text-white">Temperature Change: {leftYear} vs {rightYear}</h3>
          <div className="flex items-center gap-2 text-cyan-200">
            <ArrowLeftRight className="w-5 h-5" />
            <span className="text-sm">Drag slider to compare</span>
          </div>
        </div>
        
        <div 
          className="relative h-[600px] cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Left Map */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-full h-full">
              <MapBase>
                {/* Heat overlay for historical year - Less intense */}
                <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none">
                  <ellipse 
                    cx="400" 
                    cy="280" 
                    rx="70" 
                    ry="55" 
                    fill={`rgba(255, 180, 0, ${getHeatIntensity(leftYear) * 0.4})`}
                  />
                  <ellipse 
                    cx="550" 
                    cy="200" 
                    rx="50" 
                    ry="40" 
                    fill={`rgba(255, 200, 0, ${getHeatIntensity(leftYear) * 0.35})`}
                  />
                  <ellipse 
                    cx="280" 
                    cy="380" 
                    rx="55" 
                    ry="45" 
                    fill={`rgba(255, 200, 0, ${getHeatIntensity(leftYear) * 0.3})`}
                  />
                </svg>
                <div className="absolute top-4 left-4 bg-blue-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl z-10">
                  {leftYear}
                </div>
              </MapBase>
            </div>
          </div>

          {/* Right Map */}
          <div className="absolute top-0 right-0 h-full w-full">
            <MapBase>
              {/* Heat overlay for current year - More intense */}
              <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none">
                <ellipse 
                  cx="400" 
                  cy="280" 
                  rx="85" 
                  ry="65" 
                  fill={`rgba(255, 80, 0, ${getHeatIntensity(rightYear) * 0.55})`}
                />
                <ellipse 
                  cx="550" 
                  cy="200" 
                  rx="65" 
                  ry="55" 
                  fill={`rgba(255, 100, 0, ${getHeatIntensity(rightYear) * 0.5})`}
                />
                <ellipse 
                  cx="280" 
                  cy="380" 
                  rx="70" 
                  ry="60" 
                  fill={`rgba(255, 120, 0, ${getHeatIntensity(rightYear) * 0.48})`}
                />
                <ellipse 
                  cx="500" 
                  cy="450" 
                  rx="75" 
                  ry="50" 
                  fill={`rgba(255, 100, 0, ${getHeatIntensity(rightYear) * 0.52})`}
                />
                <ellipse 
                  cx="380" 
                  cy="150" 
                  rx="60" 
                  ry="45" 
                  fill={`rgba(255, 140, 0, ${getHeatIntensity(rightYear) * 0.45})`}
                />
              </svg>
              <div className="absolute top-4 right-4 bg-purple-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl z-10">
                {rightYear}
              </div>
            </MapBase>
          </div>

          {/* Slider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-2xl"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-[#0a1628]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Temperature Change</h3>
          <div className="text-4xl text-red-400 mb-2">
            +{((parseInt(rightYear) - parseInt(leftYear)) * 0.3).toFixed(1)}°C
          </div>
          <div className="text-cyan-200 text-sm">Average increase over period</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Urbanization</h3>
          <div className="text-4xl text-orange-400 mb-2">
            +{((parseInt(rightYear) - parseInt(leftYear)) * 2.1).toFixed(1)}%
          </div>
          <div className="text-cyan-200 text-sm">Built-up area expansion</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Green Cover Loss</h3>
          <div className="text-4xl text-yellow-400 mb-2">
            -{((parseInt(rightYear) - parseInt(leftYear)) * 1.2).toFixed(1)}%
          </div>
          <div className="text-cyan-200 text-sm">Tree canopy reduction</div>
        </div>
      </div>
    </div>
  );
}
