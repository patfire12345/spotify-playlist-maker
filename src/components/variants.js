export const containerVariants = {
  hidden: {
    x: 0,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

export const buttonVariants = {
  hover: {
    scale: 2,
    opacity: 0.8,
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  },
};
