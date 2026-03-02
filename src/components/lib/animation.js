export const getMarqueeVariants = (totalWidth) => ({
  animate: {
    x: [0, -totalWidth], 
    transition: {
      duration: 20, 
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    },
  },
});

export const slideVariants = {
  enter: {
    x: "100%",
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "-100%",
    opacity: 0,
  },
};