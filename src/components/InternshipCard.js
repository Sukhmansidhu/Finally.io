import React from "react";
import { motion } from "framer-motion";

export default function InternshipCard({ title, company, location, duration, stipend, applyLink }) {
  return (
    <motion.div
      className="card p-3 mb-3"
      role="article"
      tabIndex="0"
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h5>{title}</h5>
      <p className="small text-muted">{company} • {location}</p>
      <p className="small">Duration: {duration} | Stipend: {stipend}</p>
      <a
        href={applyLink}
        target="_blank"
        rel="noreferrer"
        aria-label={`Apply for internship: ${title} at ${company}`}
      >
        <button className="btn btn-sm btn-primary w-100">Apply</button>
      </a>
    </motion.div>
  );
}