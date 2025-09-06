import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios.get("/data/jobs.json")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const categories = Array.from(new Set(jobs.map(job => job.category || "General")));

  const filtered = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || job.category === category;
    return matchesQuery && matchesCategory;
  });

  if (jobs.length === 0) return <p>Loading jobs...</p>;

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
        Jobs
      </motion.h2>

      <motion.div className="d-flex flex-wrap gap-2 mb-4" variants={fadeInUp}>
        <motion.input
          type="text"
          className="form-control"
          placeholder="Search jobs..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <motion.select
          className="form-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </motion.select>
      </motion.div>

      <motion.div className="row" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {filtered.length > 0 ? (
          filtered.map(job => (
            <motion.div
              key={job.id}
              className="col-md-4 mb-3"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="card p-3 shadow-sm h-100">
                <h5>{job.title}</h5>
                <p className="small text-muted">{job.company} • {job.location}</p>
                <p className="small">Category: {job.category}</p>
                <a href={job.applyLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                  Apply
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p variants={fadeInUp}>No jobs found.</motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}