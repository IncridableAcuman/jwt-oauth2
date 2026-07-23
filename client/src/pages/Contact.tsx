import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold">
          Men Bilan <span className="text-cyan-400">Bog'laning</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Loyiha bo'yicha savollaringiz yoki hamkorlik takliflaringiz bo'lsa, xabar qoldiring.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Kontakt ma'lumotlari */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-4 p-5 rounded-2xl bg-gray-800/40 border border-gray-800">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
              <p className="font-semibold text-gray-200 mt-0.5">dev@example.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-5 rounded-2xl bg-gray-800/40 border border-gray-800">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Manzil</p>
              <p className="font-semibold text-gray-200 mt-0.5">Toshkent, O'zbekiston</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-5 rounded-2xl bg-gray-800/40 border border-gray-800">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Telefon</p>
              <p className="font-semibold text-gray-200 mt-0.5">+998 (90) 123-45-67</p>
            </div>
          </div>
        </motion.div>

        {/* Aloqa formasi */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="lg:col-span-2 p-8 rounded-2xl bg-gray-800/30 border border-gray-800 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Ismingiz</label>
              <input
                type="text"
                required
                placeholder="Ismingizni kiriting"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="nomi@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Xabar</label>
            <textarea
              rows={5}
              required
              placeholder="Loyiha haqida batafsil yozing..."
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white outline-none transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-cyan-500 text-gray-950 font-semibold hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            <span>Xabarni Yuborish</span>
          </button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-400 text-sm mt-2"
            >
              Rahmat! Xabaringiz muvaffaqiyatli yuborildi.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default Contact