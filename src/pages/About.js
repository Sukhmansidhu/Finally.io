import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    { title: "Curated Resources", desc: "Access learning materials carefully selected to help you grow." },
    { title: "Internship Opportunities", desc: "Find internships that match your skills and interests." },
    { title: "Career Guidance", desc: "Get expert advice and mentorship to shape your career path." },
    { title: "Skill Development", desc: "Enhance your abilities with guided courses and projects." },
    { title: "Community Support", desc: "Connect with peers and mentors to share knowledge and experiences." },
    { title: "Progress Tracking", desc: "Monitor your learning journey and achievements easily." }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <motion.div className="container my-5" initial="hidden" animate="visible" variants={fadeInStagger}>
      <motion.h1 className="text-center mb-5 display-4 fw-bold" variants={fadeInUp}>
        About Fynally
      </motion.h1>
      <motion.p className="text-center mb-5 lead" variants={fadeInUp}>
        Fynally is your life companion platform, guiding you from student to employee
        through curated resources, internships, and job opportunities. Our platform is designed
        to empower you in every stage of your career journey, ensuring you gain the knowledge,
        skills, and guidance needed to succeed in a competitive world.
      </motion.p>
      <motion.p className="text-center mb-5" variants={fadeInUp}>
        Since our inception, Fynally has helped thousands of students and young professionals
        explore learning paths, apply for internships, and secure rewarding careers. By focusing
        on practical skills and mentorship, we bridge the gap between education and real-world
        work experience.
      </motion.p>

      <motion.div className="row mb-5" variants={fadeInStagger}>
        {features.map((feature, i) => (
          <motion.div key={i} className="col-md-6 col-lg-4 mb-4" variants={fadeInUp}>
            <div className="card h-100 shadow-lg p-4 text-center">
              <h5 className="fw-bold">{feature.title}</h5>
              <p className="small">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.section className="my-5 text-center" variants={fadeInUp}>
        <motion.h3 className="mb-3">Our Mission</motion.h3>
        <motion.p className="mb-4">
          Empower students and learners with knowledge, mentorship, and career guidance.
        </motion.p>

        <motion.h3 className="mb-3">Our Vision</motion.h3>
        <motion.p className="mb-4">
          To be the go-to platform for smooth career transitions and skill development.
        </motion.p>

        <motion.h3 className="mb-3">Our Values</motion.h3>
        <motion.p>
          Commitment, Innovation, Collaboration, and Growth — guiding every decision we make
          to support our users in achieving their career aspirations.
        </motion.p>
      </motion.section>
    </motion.div>
  );
}