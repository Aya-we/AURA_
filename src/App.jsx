import React from 'react';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Auth from './components/Auth';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/variables.css';
import './styles/components/Footer.css';

function App() {
  return (
    <StoreProvider>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <ProductGrid />
          <About />
        </main>
        <footer className="footer">
          <div className="footer-content">
            <h2 className="serif">AURA</h2>
            <p>Minimalist Luxury Fashion. Curated for the few.</p>
            <div className="footer-links">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 AURA. All rights reserved.</p>
          </div>
        </footer>
        <Cart />
        <Wishlist />
        <Auth />
        <ThemeSwitcher />
      </div>
    </StoreProvider>
  );
}

export default App;
