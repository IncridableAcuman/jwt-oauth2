import React from 'react'
import { motion } from 'framer-motion'

interface SkillItem {
  name: string
  level: number
  category: string
}

const skillsData: SkillItem[] = [
  { name: 'React / Next.js', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { name: 'Java / Spring Boot', level: 80, category: 'Backend' },
  { name: 'REST API & OAuth2', level: 85, category: 'Backend' },
  { name: 'Git & Linux (Ubuntu)', level: 88, category: 'Tools' },
]

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold">
          Mening <span className="text-cyan-400">Ko'nikmalarim</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Loyihalarni amalga oshirishda foydalanadigan asosiy texnologik va dasturlash vositalarim.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/60 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-lg text-gray-200">{skill.name}</span>
              <span className="text-sm font-medium text-cyan-400">{skill.level}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              />
            </div>
            <span className="text-xs text-gray-400 mt-3 block">{skill.category}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills