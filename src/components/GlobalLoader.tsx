import { useIsFetching } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'

const GlobalLoader = () => {
  const isFetching = useIsFetching()

  return (
    <AnimatePresence>
      {isFetching > 0 && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-blue-400/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-sm font-medium">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GlobalLoader
