import { motion } from 'motion/react';
import { Map, Leaf, TrendingUp, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  // Generate random bubbles
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#2dd4bf]">
      {/* Animated Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-400/10 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white flex items-center gap-2"
          >
            <Map className="w-8 h-8" />
            <span className="text-2xl">UrbanCool</span>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white mb-6"
            >
              UrbanCool — AI-Driven Heat Mapping & Climate Simulation
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-cyan-100 text-xl mb-12 max-w-3xl mx-auto"
            >
              Visualize, predict, and cool your city using intelligent data.
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { icon: Map, title: 'Heat Mapping', description: 'Real-time urban heat island visualization with AI analytics' },
                { icon: Leaf, title: 'Carbon Credits', description: 'Calculate and offset your carbon footprint effectively' },
                { icon: TrendingUp, title: 'Urban Simulator', description: 'Test climate interventions before implementation' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transition-all"
                >
                  <feature.icon className="w-12 h-12 text-cyan-300 mb-4 mx-auto" />
                  <h3 className="text-white mb-3">{feature.title}</h3>
                  <p className="text-cyan-100 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] px-8 py-4 rounded-2xl inline-flex items-center gap-2 shadow-2xl transition-all hover:shadow-cyan-400/50"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-cyan-100 text-center flex justify-center gap-8 flex-wrap"
          >
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}
