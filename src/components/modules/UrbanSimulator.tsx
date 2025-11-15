import { useState } from 'react';
import { TreePine, Home, Zap, Droplet, Factory, Undo, RotateCcw, Play } from 'lucide-react';
import { motion } from 'motion/react';
import MapBase from '../MapBase';

type ToolType = 'tree' | 'roof' | 'solar' | 'water' | 'industry' | null;

interface PlacedElement {
  id: string;
  type: ToolType;
  x: number;
  y: number;
}

const tools = [
  { type: 'tree' as ToolType, icon: TreePine, label: 'Tree', color: '#22c55e' },
  { type: 'roof' as ToolType, icon: Home, label: 'Reflective Roof', color: '#f97316' },
  { type: 'solar' as ToolType, icon: Zap, label: 'Solar Panel', color: '#eab308' },
  { type: 'water' as ToolType, icon: Droplet, label: 'Water Body', color: '#3b82f6' },
  { type: 'industry' as ToolType, icon: Factory, label: 'Industry', color: '#ef4444' },
];

export default function UrbanSimulator() {
  const [selectedTool, setSelectedTool] = useState<ToolType>(null);
  const [elements, setElements] = useState<PlacedElement[]>([]);
  const [stats, setStats] = useState({
    temp: 36.2,
    canopy: 12.4,
    energy: 145,
    carbon: 520,
  });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newElement: PlacedElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedTool,
      x,
      y,
    };

    setElements([...elements, newElement]);
    updateStats(selectedTool, 'add');
  };

  const updateStats = (type: ToolType, action: 'add' | 'remove') => {
    const multiplier = action === 'add' ? 1 : -1;
    
    setStats(prev => {
      const newStats = { ...prev };
      
      switch (type) {
        case 'tree':
          newStats.temp -= 0.3 * multiplier;
          newStats.canopy += 0.8 * multiplier;
          newStats.carbon -= 5 * multiplier;
          break;
        case 'roof':
          newStats.temp -= 0.2 * multiplier;
          newStats.energy -= 3 * multiplier;
          break;
        case 'solar':
          newStats.energy -= 8 * multiplier;
          newStats.carbon -= 3 * multiplier;
          break;
        case 'water':
          newStats.temp -= 0.5 * multiplier;
          break;
        case 'industry':
          newStats.temp += 0.4 * multiplier;
          newStats.carbon += 12 * multiplier;
          break;
      }
      
      return newStats;
    });
  };

  const handleUndo = () => {
    if (elements.length === 0) return;
    const lastElement = elements[elements.length - 1];
    updateStats(lastElement.type, 'remove');
    setElements(elements.slice(0, -1));
  };

  const handleReset = () => {
    setElements([]);
    setStats({
      temp: 36.2,
      canopy: 12.4,
      energy: 145,
      carbon: 520,
    });
  };

  const getColor = (type: ToolType) => {
    const tool = tools.find(t => t.type === type);
    return tool?.color || '#ffffff';
  };

  const getIcon = (type: ToolType) => {
    const tool = tools.find(t => t.type === type);
    return tool?.icon || TreePine;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Urban Simulator</h2>
        <p className="text-cyan-200">Design and test urban interventions before implementation</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
            <h3 className="text-white mb-4">Tools</h3>
            <div className="space-y-2">
              {tools.map((tool) => (
                <motion.button
                  key={tool.type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTool(selectedTool === tool.type ? null : tool.type)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    selectedTool === tool.type
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628]'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <tool.icon className="w-5 h-5" />
                  <span className="text-sm">{tool.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 space-y-4">
            <h3 className="text-white">Impact Stats</h3>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cyan-200">Temperature</span>
                <span className="text-white">{stats.temp.toFixed(1)}°C</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all"
                  style={{ width: `${Math.max(0, 100 - (stats.temp - 20) * 2)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cyan-200">Canopy</span>
                <span className="text-white">{stats.canopy.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-teal-400 transition-all"
                  style={{ width: `${Math.min(100, stats.canopy * 2)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cyan-200">Energy Use</span>
                <span className="text-white">{stats.energy.toFixed(0)} MW</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all"
                  style={{ width: `${Math.min(100, stats.energy / 2)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cyan-200">Carbon</span>
                <span className="text-white">{stats.carbon.toFixed(0)} tons</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-pink-400 transition-all"
                  style={{ width: `${Math.min(100, stats.carbon / 8)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map & Controls */}
        <div className="lg:col-span-3 space-y-4">
          {/* Control Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleUndo}
              disabled={elements.length === 0}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Undo className="w-5 h-5" />
              Undo
            </button>
            <button
              onClick={handleReset}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 text-white hover:bg-white/20 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
            <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] rounded-2xl px-6 py-3 flex items-center gap-2 ml-auto">
              <Play className="w-5 h-5" />
              Simulate 1-Year Impact
            </button>
          </div>

          {/* Map */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden h-[600px] relative">
            {selectedTool && (
              <div className="bg-cyan-500 text-white px-4 py-2 text-sm">
                Click on the map to place: {tools.find(t => t.type === selectedTool)?.label}
              </div>
            )}
            <div 
              className={`relative ${selectedTool ? 'h-[calc(100%-40px)]' : 'h-full'} cursor-crosshair`}
              onClick={handleMapClick}
            >
              <MapBase>
                {/* Render placed elements */}
                {elements.map((element) => {
                  const Icon = getIcon(element.type);
                  return (
                    <div
                      key={element.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                      }}
                    >
                      {/* Area of effect */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-xl"
                        style={{
                          backgroundColor: getColor(element.type),
                          width: '80px',
                          height: '80px',
                        }}
                      />
                      {/* Icon */}
                      <div
                        className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: getColor(element.type) }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  );
                })}
              </MapBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
