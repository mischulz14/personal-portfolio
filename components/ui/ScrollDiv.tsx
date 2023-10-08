import { motion } from 'framer-motion';

export default function ScrollDiv() {
  return (
    <div className="scroll-div p-2 border-2 rounded-full flex justify-center  border-white w-8 h-14 fixed bottom-20 left-1/2 -translate-x-1/2">
      <motion.div
        className="absolute bottom-1 w-4 h-4 self-end rounded-full bg-white"
        initial={{ opacity: 1, translateY: 0 }}
        animate={{
          opacity: [1, 1, 0],
          translateY: [0, -30],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      />
      <span className="absolute -bottom-8 block text-gray-400">Scroll</span>
    </div>
  );
}
