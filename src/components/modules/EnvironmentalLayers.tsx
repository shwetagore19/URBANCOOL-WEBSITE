import { useState } from 'react';
import { TreePine, Droplet, Building2, Users, Wind } from 'lucide-react';
import MapBase from '../MapBase';

interface Layer {
  id: string;
  name: string;
  icon: any;
  color: string;
  enabled: boolean;
}

export default function EnvironmentalLayers() {
  const [layers, setLayers] = useState<Layer[]>([
    { id: 'canopy', name: 'Tree Canopy', icon: TreePine, color: '#22c55e', enabled: false },
    { id: 'water', name: 'Water Bodies', icon: Droplet, color: '#3b82f6', enabled: false },
    { id: 'urban', name: 'Urbanization', icon: Building2, color: '#ef4444', enabled: false },
    { id: 'population', name: 'Population Density', icon: Users, color: '#f59e0b', enabled: false },
    { id: 'pollution', name: 'Pollution Zones', icon: Wind, color: '#8b5cf6', enabled: false },
  ]);

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Environmental Data Layers</h2>
        <p className="text-cyan-200">Toggle multiple environmental datasets on the Nashik map</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Layer Controls */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Available Layers</h3>
          <div className="space-y-3">
            {layers.map((layer) => (
              <label
                key={layer.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={layer.enabled}
                  onChange={() => toggleLayer(layer.id)}
                  className="w-4 h-4 rounded accent-cyan-400"
                />
                <layer.icon
                  className="w-5 h-5"
                  style={{ color: layer.color }}
                />
                <span className="text-white text-sm flex-1">{layer.name}</span>
                {layer.enabled && (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                )}
              </label>
            ))}
          </div>

          {/* Layer Stats */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <h4 className="text-white text-sm mb-3">Active Layers</h4>
            <div className="text-2xl text-white mb-1">
              {layers.filter(l => l.enabled).length}
            </div>
            <div className="text-cyan-200 text-sm">of {layers.length} enabled</div>
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-3 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden h-[700px] relative">
          <MapBase>
            {/* Render enabled layers as overlays */}
            {layers.find(l => l.id === 'canopy' && l.enabled) && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Gangapur Dam and western green zones */}
                <div className="absolute top-[25%] left-[15%] w-32 h-32 rounded-full opacity-40 blur-2xl" style={{ backgroundColor: '#22c55e' }} />
                <div className="absolute top-[60%] left-[20%] w-40 h-36 rounded-full opacity-40 blur-2xl" style={{ backgroundColor: '#22c55e' }} />
                <div className="absolute top-[35%] left-[8%] w-28 h-28 rounded-full opacity-35 blur-2xl" style={{ backgroundColor: '#22c55e' }} />
              </div>
            )}
            
            {layers.find(l => l.id === 'water' && l.enabled) && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Water bodies - Gangapur area and east */}
                <div className="absolute top-[30%] left-[12%] w-40 h-32 rounded-full opacity-45 blur-2xl" style={{ backgroundColor: '#3b82f6' }} />
                <div className="absolute top-[58%] left-[18%] w-36 h-28 rounded-full opacity-40 blur-2xl" style={{ backgroundColor: '#3b82f6' }} />
                <div className="absolute top-[72%] right-[28%] w-32 h-26 rounded-full opacity-38 blur-2xl" style={{ backgroundColor: '#3b82f6' }} />
              </div>
            )}
            
            {layers.find(l => l.id === 'urban' && l.enabled) && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Dense urban areas - Central Nashik */}
                <div className="absolute top-[45%] left-[48%] w-52 h-44 rounded opacity-35 blur-xl" style={{ backgroundColor: '#ef4444' }} />
                <div className="absolute top-[32%] left-[68%] w-40 h-36 rounded opacity-30 blur-xl" style={{ backgroundColor: '#ef4444' }} />
              </div>
            )}
            
            {layers.find(l => l.id === 'population' && l.enabled) && (
              <div className="absolute inset-0 pointer-events-none">
                {/* High population density zones */}
                <div className="absolute top-[47%] left-[50%] w-44 h-44 rounded-full opacity-38 blur-2xl" style={{ backgroundColor: '#f59e0b' }} />
                <div className="absolute top-[33%] left-[68%] w-36 h-36 rounded-full opacity-35 blur-2xl" style={{ backgroundColor: '#f59e0b' }} />
              </div>
            )}
            
            {layers.find(l => l.id === 'pollution' && l.enabled) && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Industrial pollution zones */}
                <div className="absolute bottom-[22%] right-[20%] w-48 h-40 rounded opacity-38 blur-2xl" style={{ backgroundColor: '#8b5cf6' }} />
                <div className="absolute top-[48%] left-[50%] w-40 h-36 rounded opacity-32 blur-2xl" style={{ backgroundColor: '#8b5cf6' }} />
              </div>
            )}
          </MapBase>

          {/* Legend */}
          {layers.some(l => l.enabled) && (
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl z-10 max-w-xs">
              <div className="text-sm mb-2">Active Layers</div>
              {layers.filter(l => l.enabled).map((layer) => (
                <div key={layer.id} className="flex items-center gap-2 mb-1">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: layer.color, opacity: 0.7 }}
                  />
                  <span className="text-xs">{layer.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Layer Information Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`rounded-3xl border p-4 transition-all ${
              layer.enabled
                ? 'bg-white/15 backdrop-blur-xl border-white/30'
                : 'bg-white/5 backdrop-blur-xl border-white/10'
            }`}
          >
            <layer.icon
              className="w-8 h-8 mb-2"
              style={{ color: layer.color }}
            />
            <div className="text-white text-sm mb-1">{layer.name}</div>
            <div className="text-cyan-200 text-xs">
              {layer.id === 'canopy' && '12.4% coverage'}
              {layer.id === 'water' && '3.2% area'}
              {layer.id === 'urban' && '67.8% density'}
              {layer.id === 'population' && '1.5M residents'}
              {layer.id === 'pollution' && 'AQI: 178'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
