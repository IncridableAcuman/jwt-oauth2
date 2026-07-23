import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Skills from './Skills'
import Services from './Services'
import Contact from './Contact'
import Footer from '../components/Footer'

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Orqa fondagi neon nur effekti */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-800/80 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              Full-Stack Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            Zamonaviy & Tezkor <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Web Yechimlar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            React, TypeScript va zamonaviy texnologiyalar yordamida yuqori unumdorlikka ega bo'lgan interaktiv ilovalarni barpo etaman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl bg-cyan-500 text-gray-950 font-semibold hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-105"
            >
              Bog'lanish
            </a>
            <a
              href="https://github.com/IncridableAcuman"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-gray-800 border border-gray-700 font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              GitHub Profil
            </a>
          </motion.div>
        </div>
      </section>

      {/* Barcha bo'limlar */}
      <Skills />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home