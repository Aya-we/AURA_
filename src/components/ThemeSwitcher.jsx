import React from 'react';
import { useStore } from '../context/StoreContext';
import { Palette } from 'lucide-react';
import '../styles/components/ThemeSwitcher.css';

const themes = [
  { id: 'light', name: 'Original', color: '#ffffff' },
  { id: 'warm', name: 'Warm Beige', color: '#fdfaf5' },
  { id: 'soft-pink', name: 'Soft Rose', color: '#fff9f9' },
  { id: 'minimal-dark', name: 'Studio Dark', color: '#121212' },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`theme-switcher ${isOpen ? 'open' : ''}`}>
      <button className="theme-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Palette size={20} />
      </button>
      
      <div className="theme-options">
        {themes.map(t => (
          <button 
            key={t.id}
            className={`theme-opt ${theme === t.id ? 'active' : ''}`}
            onClick={() => setTheme(t.id)}
            title={t.name}
          >
            <span className="dot" style={{ backgroundColor: t.color }}></span>
            <span className="label text-xs uppercase tracking-widest">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
