import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/components/Auth.css';

const Auth = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser } = useStore();
  const [isLogin, setIsLogin] = useState(true); // toggle between Login and Create Account
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network delay
    setTimeout(() => {
      setIsProcessing(false);
      setUser({ name: e.target.email.value.split('@')[0] });
      setIsAuthOpen(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthOpen(false)}
            className="drawer-overlay"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="auth-drawer"
          >
            <div className="drawer-header">
              <h2 className="serif">{user ? "My Account" : (isLogin ? "Sign In" : "Create Account")}</h2>
              <button onClick={() => setIsAuthOpen(false)}><X size={24} /></button>
            </div>

            <div className="drawer-content auth-content">
              {user ? (
                <div className="account-details">
                  <div className="welcome-text">
                    <p>Welcome back,</p>
                    <h3 className="serif">{user.name}</h3>
                  </div>
                  <div className="account-links">
                    <button className="account-link">Order History</button>
                    <button className="account-link">Saved Addresses</button>
                    <button className="account-link">Account Details</button>
                  </div>
                  <button className="btn btn-outline logout-btn" onClick={logout}>Sign Out</button>
                </div>
              ) : (
                <div className="auth-form-container">
                  <p className="auth-subtitle">
                    {isLogin 
                      ? "Sign in to access your wishlist, saved addresses, and track your orders." 
                      : "Create an account to save your wishlist and checkout faster."}
                  </p>
                  
                  <form onSubmit={handleSubmit} className="checkout-form">
                    {!isLogin && (
                      <div className="form-group">
                        <label>Full Name</label>
                        <input name="name" type="text" required placeholder="Jane Doe" />
                      </div>
                    )}
                    <div className="form-group">
                      <label>Email Address</label>
                      <input name="email" type="email" required placeholder="jane@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input name="password" type="password" required placeholder="••••••••" />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="checkout-btn"
                      disabled={isProcessing}
                      style={{ opacity: isProcessing ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <Loader size={20} />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        isLogin ? "Sign In" : "Create Account"
                      )}
                    </button>
                  </form>

                  <div className="auth-toggle">
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                      {isLogin ? "Don't have an account? Create one." : "Already have an account? Sign in."}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Auth;
