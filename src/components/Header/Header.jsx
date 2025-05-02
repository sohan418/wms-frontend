import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="app-header">
      {/* ... other header content ... */}
      <button 
        className="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
    </header>
  );
};