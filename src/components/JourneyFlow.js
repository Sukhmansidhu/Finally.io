import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { id: "student", title: "Student", desc: "Explore career options" },
  { id: "learner", title: "Learner", desc: "Build skills with curated courses" },
  { id: "intern", title: "Intern", desc: "Gain real-world experience" },
  { id: "employee", title: "Employee", desc: "Kickstart your career" }
];

export default function JourneyFlow({ onStepSelect }) {
  const [activeStep, setActiveStep] = useState("student");

  const handleSelect = (stepId) => {
    setActiveStep(stepId);
    if (onStepSelect) onStepSelect(stepId);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="d-flex justify-content-between my-5 flex-wrap"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          className={`text-center flex-fill m-2 p-3 rounded journey-flow-card ${
            activeStep === step.id ? "bg-primary text-white" : ""
          }`}
          role="button"
          tabIndex="0"
          aria-pressed={activeStep === step.id}
          onClick={() => handleSelect(step.id)}
          onKeyDown={(e) => e.key === "Enter" && handleSelect(e.key)}
          whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.97 }}
          variants={fadeInUp}
          layout
        >
          <motion.div
            className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: 80,
              height: 80,
              background: activeStep === step.id ? "var(--card-bg)" : "var(--primary-color)",
              color: activeStep === step.id ? "var(--primary-color)" : "var(--card-bg)"
            }}
            layout
          >
            {i + 1}
          </motion.div>
          <h5 className={activeStep === step.id ? "text-white" : "text-dark"}>{step.title}</h5>
          <p className="small text-muted">{step.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}