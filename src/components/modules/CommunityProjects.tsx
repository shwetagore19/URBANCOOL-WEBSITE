import { motion } from 'motion/react';
import { TreePine, Droplet, Zap, Users, DollarSign, Target } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Green Canopy Initiative',
    description: 'Plant 10,000 trees across urban Nashik to increase canopy coverage and reduce UHI effects',
    icon: TreePine,
    impact: '-2.5°C temperature reduction',
    funded: 68,
    target: 50000,
    participants: 342,
    color: 'from-green-500/20 to-teal-500/20',
    borderColor: 'border-green-400/30',
  },
  {
    id: 2,
    title: 'Cool Roofs Program',
    description: 'Retrofit 500 buildings with reflective roofing materials to reduce heat absorption',
    icon: Zap,
    impact: '30% energy savings',
    funded: 45,
    target: 75000,
    participants: 156,
    color: 'from-orange-500/20 to-yellow-500/20',
    borderColor: 'border-orange-400/30',
  },
  {
    id: 3,
    title: 'Urban Water Bodies Restoration',
    description: 'Restore and create 5 artificial lakes and ponds for natural cooling and biodiversity',
    icon: Droplet,
    impact: '8 km² cooling effect',
    funded: 82,
    target: 120000,
    participants: 523,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-400/30',
  },
  {
    id: 4,
    title: 'Community Solar Grid',
    description: 'Install solar panels on 200 residential buildings for clean energy and reduced emissions',
    icon: Zap,
    impact: '400 tons CO₂ offset/year',
    funded: 55,
    target: 90000,
    participants: 287,
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-400/30',
  },
  {
    id: 5,
    title: 'Smart Urban Forestry',
    description: 'IoT-enabled monitoring of urban trees with automated irrigation and health tracking',
    icon: TreePine,
    impact: '95% tree survival rate',
    funded: 72,
    target: 40000,
    participants: 198,
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-400/30',
  },
  {
    id: 6,
    title: 'Heat Awareness Campaign',
    description: 'Educate 100,000 citizens about heat stress prevention and climate adaptation',
    icon: Users,
    impact: '100K citizens reached',
    funded: 91,
    target: 25000,
    participants: 1247,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-400/30',
  },
];

export default function CommunityProjects() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Community Climate Projects</h2>
        <p className="text-cyan-200">Join citizen-led initiatives to cool Nashik and combat urban heat</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-200">Total Participants</span>
          </div>
          <div className="text-3xl text-white">2,753</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-green-400 text-xl">Rs.</span>
            <span className="text-cyan-200">Total Funded</span>
          </div>
          <div className="text-3xl text-white">Rs.245K</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-purple-400" />
            <span className="text-cyan-200">Active Projects</span>
          </div>
          <div className="text-3xl text-white">6</div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`bg-gradient-to-br ${project.color} backdrop-blur-xl rounded-3xl border ${project.borderColor} p-6 flex flex-col`}
          >
            {/* Icon & Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <project.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">{project.title}</h3>
                <p className="text-cyan-100 text-sm">{project.description}</p>
              </div>
            </div>

            {/* Impact Badge */}
            <div className="bg-white/20 rounded-2xl px-3 py-2 mb-4 inline-flex items-center gap-2 self-start">
              <Target className="w-4 h-4 text-white" />
              <span className="text-white text-sm">{project.impact}</span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-cyan-100">Funding Progress</span>
                <span className="text-white">{project.funded}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.funded}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
                />
              </div>
              <div className="flex justify-between text-xs mt-1 text-cyan-200">
                <span>Rs.{((project.target * project.funded) / 100).toLocaleString()} raised</span>
                <span>Goal: Rs.{project.target.toLocaleString()}</span>
              </div>
            </div>

            {/* Participants */}
            <div className="flex items-center gap-2 mb-4 text-cyan-100 text-sm">
              <Users className="w-4 h-4" />
              <span>{project.participants} participants</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] rounded-2xl py-2 px-4 text-sm"
              >
                Join Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/20 text-white rounded-2xl py-2 px-4 text-sm hover:bg-white/30"
              >
                Fund
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl border border-cyan-400/30 p-8 text-center">
        <h3 className="text-white mb-3">Start Your Own Project</h3>
        <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
          Have an idea to cool your neighborhood? Create a community project and get support from
          fellow citizens and local organizations.
        </p>
        <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#0a1628] rounded-2xl px-8 py-3">
          Propose New Project
        </button>
      </div>
    </div>
  );
}