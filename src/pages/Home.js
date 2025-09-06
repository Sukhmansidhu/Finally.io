import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import JourneyFlow from "../components/JourneyFlow";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.section className="hero-section text-center py-5" variants={fadeInUp}>
        <motion.h1 className="display-4 fw-bold mb-3" variants={fadeInUp}>
          Welcome to Fynally
        </motion.h1>
        <motion.p className="lead mb-4" variants={fadeInUp}>
          Your life companion from Student → Learner → Intern → Employee
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link
            to="/journey"
            className="btn btn-primary btn-lg mt-3"
            aria-label="Get Started on your career journey"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </Link>
        </motion.div>
      </motion.section>

      <section className="my-5">
        <h2 className="text-center mb-4 display-5 fw-bold">Your Career Journey</h2>
        <JourneyFlow />
      </section>
    </motion.div>
  );
}