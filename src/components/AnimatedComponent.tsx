import { Variants, motion } from "framer-motion";
import React from "react";

const childrenVariant: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      opacity: { ease: "circOut" },
      layout: { duration: 0.7 },
    },
  },
};

function AnimatedComponent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      variants={childrenVariant}
      className="mb-2 ml-2 mt-5"
    >
      {children}
    </motion.div>
  );
}

export default AnimatedComponent;
