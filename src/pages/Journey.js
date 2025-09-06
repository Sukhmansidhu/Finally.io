import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function StepCard({ step, index, isActive, onClick }) {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const circleVariants = {
    active: {
      scale: 1.1,
      background: "var(--card-bg)",
      color: "var(--primary-color)",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
    },
    inactive: {
      scale: 1,
      background: "var(--primary-color)",
      color: "var(--card-bg)",
    }
  };

  return (
    <motion.div
      className={`text-center flex-fill m-2 p-3 rounded-lg shadow-sm step-card ${isActive ? "bg-primary text-white" : ""}`}
      style={{ cursor: "pointer", minWidth: "120px" }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center fw-bold"
        style={{ width: 60, height: 60 }}
        variants={circleVariants}
        animate={isActive ? "active" : "inactive"}
      >
        {index + 1}
      </motion.div>
      <h5 className={isActive ? "text-white" : "text-dark"}>{step.title}</h5>
      <p className="small text-muted">{step.desc}</p>
    </motion.div>
  );
}

// Animation variants defined outside the component for performance
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Journey() {
  const [steps, setSteps] = useState([]);
  const [activeStepId, setActiveStepId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/data/journey.json")
      .then(res => {
        setSteps(res.data);
        if (res.data.length > 0) setActiveStepId(res.data[0].id);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching journey data:", err);
        setSteps([]);
        setIsLoading(false);
      });
  }, []);

  const activeStep = steps.find(step => step.id === activeStepId);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" className="container my-5">
      <motion.h2
        className="mb-4 text-center display-4 fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Career Journey
      </motion.h2>

      <motion.div
        className="d-flex justify-content-between my-5 flex-wrap"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            index={i}
            isActive={activeStepId === step.id}
            onClick={() => setActiveStepId(step.id)}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStepId}
          className="p-4 rounded shadow mt-3 journey-content-box"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {activeStep && (
            <>
              <p>{activeStep.content}</p>

              {activeStep.tips && activeStep.tips.length > 0 && (
                <div className="mt-3">
                  <h6>Tips:</h6>
                  <ul>
                    {activeStep.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeStep.resources && activeStep.resources.length > 0 && (
                <div className="mt-3">
                  <h6>Resources:</h6>
                  <ul>
                    {activeStep.resources.map((res, idx) => (
                      <li key={idx}>
                        <a href={res} target="_blank" rel="noreferrer">{res}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeStep.image && (
                <div className="mt-3 text-center">
                  <img src={`/assets/${activeStep.image}`} alt={activeStep.title} className="img-fluid rounded" style={{ maxHeight: "250px" }} />
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}