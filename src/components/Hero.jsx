import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-subtitle"
        >
          Spring / Summer 2026
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="serif"
        >
          The Essence <br /> of Pure Luxury
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover curated collections that define minimalist elegance and timeless sophistication.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero-btns"
        >
          <a href="#shop" className="btn btn-primary">Shop Collection</a>
          <a href="#about" className="btn btn-outline">Our Philosophy</a>
        </motion.div>
      </div>
      
      <div className="hero-image-container">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="/assets/hero-banner.png" 
          alt="Aura Luxury Fashion" 
        />
        <div className="overlay"></div>
      </div>
    </section>
  );
};

export default Hero;
