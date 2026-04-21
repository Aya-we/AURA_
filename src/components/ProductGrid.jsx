import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { useStore } from '../context/StoreContext';
import '../styles/components/ProductGrid.css';

const categories = ["All", "Dresses", "Heels", "Accessories"];

const ProductGrid = () => {
  const { activeCategory, setActiveCategory } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shop" className="product-grid-section">
      <div className="section-header">
        <h2 className="serif">The Collection</h2>
        <div className="filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search our pieces..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="product-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p className="serif">No pieces found matching your selection.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
