import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
      console.log("Response from API:", response.data);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <motion.h2 className="text-center mb-5 display-4 fw-bold" variants={fadeInUp}>
        Contact Us
      </motion.h2>

      <motion.form
        className="mx-auto p-4 shadow-lg rounded-4 contact-form" 
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
        variants={fadeInUp}
      >
        <motion.div className="mb-4" variants={fadeInUp}>
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="form-control form-control-lg shadow-sm"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div className="mb-4" variants={fadeInUp}>
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control form-control-lg shadow-sm"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div className="mb-4" variants={fadeInUp}>
          <label className="form-label fw-semibold">Message</label>
          <textarea
            name="message"
            className="form-control form-control-lg shadow-sm"
            rows="5"
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          animate={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Send Message"
          )}
        </motion.button>

        {submitted && (
          <motion.div
            className="alert alert-success mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your message has been sent successfully!
          </motion.div>
        )}

        {error && (
          <motion.div
            className="alert alert-danger mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}