import React from "react";
import { motion } from "framer-motion";
import MenuBar from "../components/MenuBar";
import "./ResumePage.css";

export default function ResumePage() {
  const handleDownload = () => {
    // In a real implementation, this would download an actual PDF
    alert("Resume download would start here in a production environment");
  };

  return (
    <motion.div
      className="resume-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MenuBar />

      <div className="resume-content">
        <motion.div
          className="resume-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Charitra Arora</h1>
          <h2>Software Developer</h2>

          <div className="resume-actions">
            <button className="download-button" onClick={handleDownload}>
              Download PDF
            </button>
          </div>
        </motion.div>

        <div className="resume-paper">
          <motion.section
            className="resume-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>Professional Summary</h3>
            <p>
              Innovative software developer with over 5 years of experience in
              building responsive and performant web applications. Specialized
              in React, Three.js, and modern JavaScript frameworks with a strong
              focus on creating immersive user experiences. Passionate about
              combining creative design with technical excellence.
            </p>
          </motion.section>

          <motion.section
            className="resume-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3>Work Experience</h3>

            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Senior Frontend Engineer</h4>
                <span className="resume-date">2022 - Present</span>
              </div>
              <h5>TempoLabs AI</h5>
              <ul>
                <li>
                  Led development of an AI-powered visual editor for React
                  applications
                </li>
                <li>
                  Implemented real-time code synchronization between visual
                  canvas and codebase
                </li>
                <li>
                  Optimized rendering performance for complex 3D visualizations
                </li>
                <li>
                  Mentored junior developers and established frontend best
                  practices
                </li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Lead Developer</h4>
                <span className="resume-date">2020 - 2022</span>
              </div>
              <h5>Bliss Digital</h5>
              <ul>
                <li>
                  Managed a team of 5 developers building enterprise web
                  applications
                </li>
                <li>
                  Architected scalable frontend solutions using React and
                  TypeScript
                </li>
                <li>
                  Implemented CI/CD pipelines reducing deployment time by 40%
                </li>
                <li>
                  Collaborated with UX designers to create intuitive user
                  interfaces
                </li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Frontend Developer</h4>
                <span className="resume-date">2018 - 2020</span>
              </div>
              <h5>TechFront Solutions</h5>
              <ul>
                <li>
                  Developed responsive web applications with focus on
                  performance
                </li>
                <li>
                  Created reusable component libraries used across multiple
                  projects
                </li>
                <li>
                  Implemented accessibility improvements across all company
                  products
                </li>
                <li>
                  Reduced bundle size by 35% through code splitting and lazy
                  loading
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            className="resume-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3>Education</h3>

            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Bachelor of Science in Computer Science</h4>
                <span className="resume-date">2014 - 2018</span>
              </div>
              <h5>University of Technology</h5>
              <p>
                Graduated with honors. Specialized in Human-Computer Interaction
                and Web Technologies.
              </p>
            </div>
          </motion.section>

          <motion.section
            className="resume-section skills-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3>Technical Skills</h3>

            <div className="skills-grid">
              <div className="skill-category">
                <h4>Frontend</h4>
                <ul className="skill-list">
                  <li>React & React Native</li>
                  <li>TypeScript / JavaScript</li>
                  <li>Three.js & WebGL</li>
                  <li>HTML5 / CSS3 / SCSS</li>
                  <li>Redux / Context API</li>
                </ul>
              </div>

              <div className="skill-category">
                <h4>Backend & Tools</h4>
                <ul className="skill-list">
                  <li>Node.js / Express</li>
                  <li>GraphQL / REST APIs</li>
                  <li>Git / GitHub Actions</li>
                  <li>Docker / Kubernetes</li>
                  <li>AWS / Vercel / Netlify</li>
                </ul>
              </div>

              <div className="skill-category">
                <h4>Other Skills</h4>
                <ul className="skill-list">
                  <li>UI/UX Design Principles</li>
                  <li>Performance Optimization</li>
                  <li>Responsive Design</li>
                  <li>Agile / Scrum</li>
                  <li>Technical Leadership</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="resume-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> charitraarora@gmail.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +91 810 311 8540
              </div>
              <div className="contact-item">
                <strong>LinkedIn:</strong> linkedin.com/in/charitraarora
              </div>
              <div className="contact-item">
                <strong>GitHub:</strong> github.com/charitraarora
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
