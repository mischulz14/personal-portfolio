import { motion } from 'framer-motion';

export default function ScrollDiv() {
  return (
    <div className="scroll-div p-2 border-2 rounded-full flex justify-center  border-white w-5 h-10 fixed bottom-20 left-1/2 -translate-x-1/2">
      <motion.div
        className="absolute bottom-0 w-2 h-2 self-end rounded-full bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, translateY: -30 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}
