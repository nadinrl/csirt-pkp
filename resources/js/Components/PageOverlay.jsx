// resources/js/Components/PageOverlay.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function PageOverlay({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          <div className="text-indigo-700 text-lg font-semibold animate-pulse">
            Memuat halaman...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
