import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen, setActiveCategory, setIsAuthOpen, user } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (category) => {
    setActiveCategory(category);
    setIsMenuOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="nav-logo">
          <a href="/" className="serif">AURA</a>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#shop" onClick={() => handleNavClick('Dresses')}>Dresses</a></li>
          <li><a href="#shop" onClick={() => handleNavClick('Heels')}>Heels</a></li>
          <li><a href="#shop" onClick={() => handleNavClick('Accessories')}>Accessories</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Our Story</a></li>
        </ul>

        <div className="nav-actions">
          <button className="nav-icon-btn">
            <Search size={20} />
          </button>
          <button className="nav-icon-btn" onClick={() => setIsAuthOpen(true)}>
            <User size={20} fill={user ? "var(--text-main)" : "none"} />
          </button>
          <button className="nav-icon-btn" onClick={() => setIsWishlistOpen(true)}>
            <Heart size={20} />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
          <button className="nav-icon-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
