import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, CheckCircle, Loader } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/components/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, emptyCart } = useStore();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'form', 'success'
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset step to 'cart' when cart gets closed or reopened
  React.useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => setCheckoutStep('cart'), 500); // Wait for exit animation
    }
  }, [isCartOpen]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleGoToCheckout = () => {
    setCheckoutStep('form');
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      emptyCart();
      
      // Auto close cart
      setTimeout(() => {
        setIsCartOpen(false);
      }, 4000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="drawer-overlay"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="cart-drawer"
          >
            <div className="drawer-header">
              <h2 className="serif">Your Bag</h2>
              <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>

            <div className="drawer-content">
              {checkoutStep === 'success' ? (
                <div className="empty-state checkout-success">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle size={64} color="var(--accent-gold)" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="serif">Order Confirmed</h3>
                  <p>Your payment was successful. We've sent a receipt to your email.</p>
                </div>
              ) : checkoutStep === 'form' ? (
                <div className="checkout-form-container">
                  <button className="back-to-cart" onClick={() => setCheckoutStep('cart')}>
                    ← Back to Cart
                  </button>
                  <h3 className="serif">Shipping & Payment</h3>
                  <form id="checkout-form" onSubmit={handleProcessPayment} className="checkout-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" required placeholder="Jane Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" required placeholder="jane@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Shipping Address</label>
                      <input type="text" required placeholder="123 Luxury Ave, NY" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" required placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div className="form-group half">
                        <label>CVC</label>
                        <input type="text" required placeholder="123" />
                      </div>
                    </div>
                  </form>
                </div>
              ) : cart.length === 0 ? (
                <div className="empty-state">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Your bag is currently empty.</p>
                  <button className="btn btn-outline" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
                </div>
              ) : (
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p className="price">${item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}><X size={16} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className="drawer-footer">
                <div className="total">
                  <span>Total</span>
                  <span className="amount">${total}</span>
                </div>
                
                {checkoutStep === 'cart' ? (
                  <button className="checkout-btn" onClick={handleGoToCheckout}>
                    Proceed to Checkout
                  </button>
                ) : (
                  <button 
                    type="submit"
                    form="checkout-form"
                    className="checkout-btn" 
                    disabled={isProcessing}
                    style={{ opacity: isProcessing ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Loader size={20} />
                        </motion.div>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay $${total}`
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
