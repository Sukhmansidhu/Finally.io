import React, { useState, useEffect } from "react";
import InternshipCard from "../components/InternshipCard";
import axios from "axios";
import { motion } from "framer-motion";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  useEffect(() => {
    axios.get("/data/internships.json")
      .then(res => setInternships(res.data))
      .catch(err => console.error(err));
  }, []);

  const roles = Array.from(new Set(internships.map(i => i.role || "General")));

  const filtered = internships.filter(i => {
    const matchesQuery = i.title.toLowerCase().includes(query.toLowerCase());
    const matchesRole = role === "all" || i.role === role;
    return matchesQuery && matchesRole;
  });

  if (internships.length === 0) return <p>Loading internships...</p>;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="container my-5"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      <motion.h2 className="mb-5 text-center display-4 fw-bold" variants={fadeInUp}>
        Internships
      </motion.h2>

      <motion.div className="d-flex flex-wrap gap-2 mb-4" variants={fadeInUp}>
        <motion.input
          type="text"
          className="form-control"
          placeholder="Search internships..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <motion.select
          className="form-select"
          value={role}
          onChange={e => setRole(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <option value="all">All Roles</option>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </motion.select>
      </motion.div>

      <motion.div className="row" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {filtered.length > 0 ? (
          filtered.map(i => (
            <motion.div
              key={i.id}
              className="col-md-4 mb-3"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <InternshipCard {...i} />
            </motion.div>
          ))
        ) : (
          <motion.p variants={fadeInUp}>No internships found.</motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}