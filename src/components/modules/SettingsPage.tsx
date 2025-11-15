import { useState } from 'react';
import { Save, Trash2, Wifi, Globe, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState('en');

  const savedSimulations = [
    { id: 1, name: 'Urban Forest Scenario A', date: '2024-11-10', temp: -2.3 },
    { id: 2, name: 'Solar Grid Expansion', date: '2024-11-08', temp: -1.1 },
    { id: 3, name: 'Cool Roof Initiative', date: '2024-11-05', temp: -1.8 },
  ];

  const connectedDevices = [
    { id: 1, name: 'Sensor A - Central', status: 'online', lastSync: '2 min ago' },
    { id: 2, name: 'Sensor B - Industrial', status: 'online', lastSync: '5 min ago' },
    { id: 3, name: 'Sensor C - Residential', status: 'offline', lastSync: '2 hours ago' },
    { id: 4, name: 'Sensor D - Park', status: 'online', lastSync: '1 min ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Settings & Preferences</h2>
        <p className="text-cyan-200">Manage your account, devices, and application preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-6">Profile Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-cyan-200 text-sm mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-cyan-200 text-sm mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@urbancool.com"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-cyan-200 text-sm mb-2">Organization</label>
              <input
                type="text"
                defaultValue="Nashik Municipal Corporation"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] rounded-2xl px-6 py-3 flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <h3 className="text-white mb-6">Preferences</h3>
          
          <div className="space-y-6">
            {/* Theme Toggle */}
            <div>
              <label className="block text-cyan-200 text-sm mb-3">Theme</label>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme('light')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628]'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  Light
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme('dark')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628]'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  Dark
                </motion.button>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-cyan-200 text-sm mb-3">Language</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-cyan-200 text-sm mb-3">Notifications</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-400" />
                  <span className="text-sm">Heat alerts</span>
                </label>
                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-400" />
                  <span className="text-sm">Sensor updates</span>
                </label>
                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-cyan-400" />
                  <span className="text-sm">Weekly reports</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Simulations */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-4">Saved Simulations</h3>
        <div className="space-y-3">
          {savedSimulations.map((sim) => (
            <motion.div
              key={sim.id}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
            >
              <div>
                <div className="text-white mb-1">{sim.name}</div>
                <div className="text-cyan-200 text-sm">Saved on {sim.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-green-400">{sim.temp}°C impact</div>
                <button className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connected IoT Devices */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
        <h3 className="text-white mb-4">Connected IoT Devices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {connectedDevices.map((device) => (
            <motion.div
              key={device.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl"
            >
              <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <Wifi className="w-5 h-5 text-cyan-400" />
              <div className="flex-1">
                <div className="text-white text-sm mb-1">{device.name}</div>
                <div className="text-cyan-200 text-xs">Last sync: {device.lastSync}</div>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full ${device.status === 'online' ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>
                {device.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
