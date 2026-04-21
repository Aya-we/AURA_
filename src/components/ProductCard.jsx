import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/components/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="product-card"
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="icon-btn" onClick={() => toggleWishlist(product)}>
            <Heart size={20} fill={isWishlisted ? "var(--accent-gold)" : "none"} color={isWishlisted ? "var(--accent-gold)" : "currentColor"} />
          </button>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <span className="product-cat">{product.category}</span>
        <h3 className="serif">{product.name}</h3>
        <p className="product-price">${product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
