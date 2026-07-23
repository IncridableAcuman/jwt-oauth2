import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Heart, Link, Code } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 py-12 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brend va qisqacha ma'lumot */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h3 className="text-xl font-bold text-white tracking-wider">PORTFOLIO</h3>
          <p className="text-sm mt-1 text-gray-400">
            Sifatli va zamonaviy web-ilovalar yaratish xizmati.
          </p>
        </motion.div>

        {/* Ijtimoiy tarmoqlar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-5"
        >
          <a
            href="https://github.com/IncridableAcuman"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-gray-800 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/80 transition-all duration-300 hover:scale-110"
            aria-label="GitHub Profile"
          >
            <Code size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-gray-800 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/80 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <Link size={20} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="p-2.5 rounded-full bg-gray-800 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/80 transition-all duration-300 hover:scale-110"
            aria-label="Send Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Mualliflik huquqi */}
      <div className="mt-8 pt-6 border-t border-gray-900 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
        <span>© {new Date().getFullYear()} IncridableAcuman. Developed with</span>
        <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
      </div>
    </footer>
  )
}

export default Footer