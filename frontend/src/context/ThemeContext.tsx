import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.style.background = theme === 'dark'
            ? 'linear-gradient(135deg, #0a0f1c 0%, #1a1a2e 50%, #0f1a3c 100%)'
            : 'linear-gradient(135deg, #f0f4ff 0%, #e8eaf6 50%, #fce4ec 100%)';
        document.body.style.color = theme === 'dark' ? '#fff' : '#1a1a2e';
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
