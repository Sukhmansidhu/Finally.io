import React, { useState, useEffect } from "react";
import axios from "axios";
import ResourceCard from "../components/ResourceCard";
import { motion } from "framer-motion";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios.get("/data/resources.json")
      .then(res => setResources(res.data))
      .catch(err => console.error("Error fetching resources:", err));
  }, []);

  const categories = Array.from(new Set(resources.flatMap(r => r.tags || [])));

  const filtered = resources.filter(r => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || (r.tags && r.tags.includes(category));
    return matchesQuery && matchesCategory;
  });

  if (resources.length === 0) return <p>Loading resources...</p>;

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
      <motion.h2 className="mb-4 text-center display-4 fw-bold" variants={fadeInUp}>
        Resources
      </motion.h2>

      <motion.div className="d-flex flex-wrap gap-2 mb-4" variants={fadeInUp}>
        <motion.input
          type="text"
          className="form-control"
          placeholder="Search resources..."
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
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </motion.select>
      </motion.div>

      <motion.div className="row" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {filtered.length > 0 ? (
          filtered.map(r => (
            <motion.div
              key={r.id}
              className="col-md-4 mb-3"
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ResourceCard {...r} />
            </motion.div>
          ))
        ) : (
          <motion.p variants={fadeInUp}>No resources found.</motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}