import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Map,
  Leaf,
  Box,
  Wifi,
  TrendingUp,
  Layers,
  Clock,
  FileText,
  Users,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  Home,
} from 'lucide-react';
import HeatMap from './modules/HeatMap';
import CarbonCredit from './modules/CarbonCredit';
import UrbanSimulator from './modules/UrbanSimulator';
import IoTInsights from './modules/IoTInsights';
import PredictiveModelling from './modules/PredictiveModelling';
import EnvironmentalLayers from './modules/EnvironmentalLayers';
import HistoricalComparison from './modules/HistoricalComparison';
import Reports from './modules/Reports';
import CommunityProjects from './modules/CommunityProjects';
import SettingsPage from './modules/SettingsPage';

interface DashboardProps {
  onBackToHome: () => void;
}

type ModuleType =
  | 'heatmap'
  | 'carbon'
  | 'simulator'
  | 'iot'
  | 'predictive'
  | 'layers'
  | 'historical'
  | 'reports'
  | 'community'
  | 'settings';

const menuItems = [
  { id: 'heatmap' as ModuleType, icon: Map, label: 'Heat Map' },
  { id: 'carbon' as ModuleType, icon: Leaf, label: 'Carbon Credits' },
  { id: 'simulator' as ModuleType, icon: Box, label: 'Urban Simulator' },
  { id: 'iot' as ModuleType, icon: Wifi, label: 'IoT Insights' },
  { id: 'predictive' as ModuleType, icon: TrendingUp, label: 'Predictive Modelling' },
  { id: 'layers' as ModuleType, icon: Layers, label: 'Environmental Layers' },
  { id: 'historical' as ModuleType, icon: Clock, label: 'Compare Historical Data' },
  { id: 'reports' as ModuleType, icon: FileText, label: 'Reports' },
  { id: 'community' as ModuleType, icon: Users, label: 'Community Projects' },
  { id: 'settings' as ModuleType, icon: Settings, label: 'Settings' },
];

export default function Dashboard({ onBackToHome }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<ModuleType>('heatmap');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'heatmap':
        return <HeatMap />;
      case 'carbon':
        return <CarbonCredit />;
      case 'simulator':
        return <UrbanSimulator />;
      case 'iot':
        return <IoTInsights />;
      case 'predictive':
        return <PredictiveModelling />;
      case 'layers':
        return <EnvironmentalLayers />;
      case 'historical':
        return <HistoricalComparison />;
      case 'reports':
        return <Reports />;
      case 'community':
        return <CommunityProjects />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HeatMap />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#2dd4bf] flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col fixed md:relative h-screen z-50"
          >
            {/* Logo */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-white">
                <Map className="w-6 h-6" />
                <span className="text-xl">UrbanCool</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-white hover:text-cyan-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  whileHover={{ x: 5 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    activeModule === item.id
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Back to Home */}
            <button
              onClick={onBackToHome}
              className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:bg-white/10 transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4 flex items-center gap-4">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-cyan-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-300" />
              <input
                type="text"
                placeholder="Search modules..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-2 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Notifications & Profile */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-cyan-300 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-[#0a1628]">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
