import React from "react";
import { motion } from "framer-motion";
import MenuBar from "../components/MenuBar";
import "./WorkStuffPage.css";

export default function WorkStuffPage() {
  const workExperience = [
    {
      id: 1,
      company: "TempoLabs AI",
      role: "Senior Frontend Engineer",
      period: "2022 - Present",
      description:
        "Led the development of a revolutionary AI-powered web application that allows users to edit React codebases visually. Implemented a canvas-based UI editor with real-time code synchronization.",
      technologies: [
        "React",
        "TypeScript",
        "Three.js",
        "WebGL",
        "AI Integration",
      ],
    },
    {
      id: 2,
      company: "Bliss Digital",
      role: "Lead Developer",
      period: "2020 - 2022",
      description:
        "Managed a team of 5 developers building enterprise-level web applications. Architected scalable frontend solutions and implemented CI/CD pipelines.",
      technologies: ["React", "Node.js", "GraphQL", "AWS", "Docker"],
    },
    {
      id: 3,
      company: "TechFront Solutions",
      role: "Frontend Developer",
      period: "2018 - 2020",
      description:
        "Developed responsive web applications with focus on performance optimization and accessibility. Created reusable component libraries used across multiple projects.",
      technologies: ["JavaScript", "Vue.js", "SCSS", "Webpack", "Jest"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="work-stuff-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MenuBar />

      <div className="work-content">
        <motion.h1
          className="work-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Work Experience
        </motion.h1>

        <motion.div
          className="experience-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {workExperience.map((job) => (
            <motion.div
              key={job.id}
              className="experience-card"
              variants={itemVariants}
            >
              <div className="card-header">
                <h2>{job.company}</h2>
                <span className="period">{job.period}</span>
              </div>
              <h3>{job.role}</h3>
              <p>{job.description}</p>
              <div className="technologies">
                {job.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="skills-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Core Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React & React Native</li>
                <li>Vue.js</li>
                <li>TypeScript</li>
                <li>Three.js & WebGL</li>
                <li>CSS/SCSS Architecture</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>GraphQL</li>
                <li>RESTful APIs</li>
                <li>MongoDB & SQL</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>DevOps & Tools</h3>
              <ul>
                <li>Git & GitHub Actions</li>
                <li>Docker & Kubernetes</li>
                <li>AWS & Vercel</li>
                <li>CI/CD Pipelines</li>
                <li>Testing (Jest, Cypress)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
