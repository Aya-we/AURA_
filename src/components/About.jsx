import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-text">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-subtitle"
          >
            Our Story
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="serif"
          >
            Redefining <br /> Minimalist Luxury
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Aura was born from a desire to strip away the excess and focus on the pure essence of luxury. We believe that true elegance lies in simplicity, quality materials, and meticulous craftsmanship. Every piece in our collection is designed to empower and inspire confidence, standing the test of time both in style and durability.
          </motion.p>
        </div>
        <div className="about-image">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/assets/champagne-satin-dress.png" 
            alt="Aura Craftsmanship" 
          />
        </div>
      </div>
    </section>
  );
};

export default About;
