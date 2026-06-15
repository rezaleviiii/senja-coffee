import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.WebP'

function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-amber-950 flex flex-col items-center justify-center z-[999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.img
            src={logo}
            alt="Senja Coffee & Co"
            className="w-24 h-24 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.h1
            className="text-white text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Senja Coffee & Co.
          </motion.h1>
          <motion.p
            className="text-amber-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Menyeduh yang terbaik untukmu...
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="mt-8 h-1 bg-amber-700 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen