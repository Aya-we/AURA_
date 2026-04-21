import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/components/Cart.css'; // Reusing common drawer styles

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart, isWishlistOpen, setIsWishlistOpen } = useStore();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="drawer-overlay"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="wishlist-drawer"
          >
            <div className="drawer-header">
              <h2 className="serif">Wishlist</h2>
              <button onClick={() => setIsWishlistOpen(false)}><X size={24} /></button>
            </div>

            <div className="drawer-content">
              {wishlist.length === 0 ? (
                <div className="empty-state">
                  <Heart size={48} strokeWidth={1} />
                  <p>Your wishlist is empty. Save your favorite pieces.</p>
                  <button className="btn btn-outline" onClick={() => setIsWishlistOpen(false)}>Browse Pieces</button>
                </div>
              ) : (
                <div className="cart-items">
                  {wishlist.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p className="price">${item.price}</p>
                        <button className="btn-small" onClick={() => {
                          addToCart(item);
                          setIsWishlistOpen(false);
                        }}>
                          Add to Bag
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => toggleWishlist(item)}><X size={16} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Wishlist;
