import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { AlertCircle, Wifi } from 'lucide-react';
import MapBase from '../MapBase';

const sensors = [
  { id: 1, name: 'Sensor A - Central', x: 50, y: 50, temp: 38.2, humidity: 45 },
  { id: 2, name: 'Sensor B - Industrial', x: 75, y: 35, temp: 41.5, humidity: 38 },
  { id: 3, name: 'Sensor C - Residential', x: 35, y: 65, temp: 35.8, humidity: 52 },
  { id: 4, name: 'Sensor D - Park', x: 45, y: 35, temp: 32.1, humidity: 62 },
  { id: 5, name: 'Sensor E - Highway', x: 65, y: 70, temp: 39.7, humidity: 41 },
];

const realtimeData = [
  { time: '10:00', temp: 32.1, humidity: 58 },
  { time: '11:00', temp: 34.3, humidity: 54 },
  { time: '12:00', temp: 36.8, humidity: 48 },
  { time: '13:00', temp: 38.2, humidity: 45 },
  { time: '14:00', temp: 39.5, humidity: 42 },
  { time: '15:00', temp: 38.7, humidity: 44 },
];

const alerts = [
  { id: 1, sensor: 'Sensor B', message: 'Temperature exceeded 40°C threshold', severity: 'high', time: '14:23' },
  { id: 2, sensor: 'Sensor E', message: 'High heat stress detected', severity: 'medium', time: '13:45' },
  { id: 3, sensor: 'Sensor A', message: 'Humidity below optimal level', severity: 'low', time: '12:10' },
];

export default function IoTInsights() {
  const [showSensors, setShowSensors] = useState(true);
  const [hoveredSensor, setHoveredSensor] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white mb-2">IoT Sensor Network</h2>
          <p className="text-cyan-200">Real-time environmental monitoring across Nashik</p>
        </div>
        <label className="flex items-center gap-2 text-white cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2">
          <input
            type="checkbox"
            checked={showSensors}
            onChange={(e) => setShowSensors(e.target.checked)}
            className="w-4 h-4 rounded accent-cyan-400"
          />
          <Wifi className="w-5 h-5" />
          <span>Show Sensors</span>
        </label>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden h-[500px] relative">
          <MapBase>
            {showSensors && sensors.map((sensor) => (
              <div
                key={sensor.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${sensor.x}%`,
                  top: `${sensor.y}%`,
                }}
                onMouseEnter={() => setHoveredSensor(sensor.id)}
                onMouseLeave={() => setHoveredSensor(null)}
              >
                {/* Pulsing effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400/30 rounded-full animate-ping" />
                
                {/* Sensor marker */}
                <div className="relative z-10 w-4 h-4 bg-cyan-400 rounded-full shadow-lg" />
                
                {/* Tooltip */}
                {hoveredSensor === sensor.id && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-xl p-3 shadow-xl whitespace-nowrap z-20">
                    <div className="text-sm mb-1">{sensor.name}</div>
                    <div className="text-xs text-gray-600">
                      <div>🌡️ {sensor.temp}°C</div>
                      <div>💧 {sensor.humidity}%</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </MapBase>
        </div>

        {/* Sensor Cards */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {sensors.map((sensor) => (
            <motion.div
              key={sensor.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-white text-sm">{sensor.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-cyan-200 text-xs mb-1">Temperature</div>
                  <div className="text-white text-xl">{sensor.temp}°C</div>
                </div>
                <div>
                  <div className="text-cyan-200 text-xs mb-1">Humidity</div>
                  <div className="text-white text-xl">{sensor.humidity}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Realtime Chart */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-4">Real-time Trends (Last 6 Hours)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#a5f3fc" />
              <YAxis yAxisId="left" stroke="#f97316" />
              <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 22, 40, 0.9)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temp"
                stroke="#f97316"
                strokeWidth={3}
                name="Temperature (°C)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-4">Active Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 p-4 rounded-2xl ${
                alert.severity === 'high'
                  ? 'bg-red-500/20 border border-red-400/30'
                  : alert.severity === 'medium'
                  ? 'bg-orange-500/20 border border-orange-400/30'
                  : 'bg-yellow-500/20 border border-yellow-400/30'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 ${
                  alert.severity === 'high'
                    ? 'text-red-400'
                    : alert.severity === 'medium'
                    ? 'text-orange-400'
                    : 'text-yellow-400'
                }`}
              />
              <div className="flex-1">
                <div className="text-white mb-1">{alert.sensor}</div>
                <div className="text-cyan-200 text-sm">{alert.message}</div>
              </div>
              <div className="text-cyan-300 text-sm">{alert.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
