import React from 'react'
import { motion } from 'framer-motion'
import { Code, Layout, Server, Cpu } from 'lucide-react'

const services = [
  {
    icon: <Layout className="w-8 h-8 text-cyan-400" />,
    title: 'Frontend Development',
    desc: 'React, TypeScript va Tailwind CSS yordamida tezkor, chiroyli va qulay interfeyslarni yaratish.',
  },
  {
    icon: <Server className="w-8 h-8 text-cyan-400" />,
    title: 'Backend Development',
    desc: 'Spring Boot va REST API orqali xavfsiz va kengayuvchan server arxitekturasini qurish.',
  },
  {
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    title: 'Full-Stack Web App',
    desc: 'Noldan boshlab loyihani rejalashtirish, frontend va backendni uzviy bog\'lash.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    title: 'IoT & Embedded Integratsiya',
    desc: 'Mikrokontroller va real vaqt rejimida ishlovchi monitoring tizimlari bilan ishlash.',
  },
]

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 bg-gray-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Mening <span className="text-cyan-400">Xizmatlarim</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            G'oyalaringizni sifatli va xavfsiz kod yordamida hayotga tatbiq etaman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg"
            >
              <div className="p-3 w-fit rounded-xl bg-cyan-500/10 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services