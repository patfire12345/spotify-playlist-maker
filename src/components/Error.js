import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Error.css";
import { buttonVariants, containerVariants } from "./variants";

export const Error = () => {
  return (
    <motion.div
      className="error-container"
      variants={containerVariants}
      initial="hidden"
      visible="animate"
      exit="exit"
    >
      <motion.div
        className="error-button"
        variants={buttonVariants}
        whileHover="hover"
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};
