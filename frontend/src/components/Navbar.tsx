import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { logout } from '../services/localAuth';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: isDark ? 'rgba(10,15,28,0.85)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    };

    const linkStyle: React.CSSProperties = {
        color: isDark ? '#e2e8f0' : '#1a1a2e',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: 500,
    };

    return (
        <nav style={navStyle}>
            <div style={{ color: '#e2c97e', fontSize: '1.2rem', fontWeight: 700 }}>
                🕉 Sanskrit Chants
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                {!token ? (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/signup" style={{
                            ...linkStyle,
                            background: '#e2c97e',
                            color: '#1a1a2e',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            fontWeight: 600,
                        }}>Sign Up</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={{
                        ...linkStyle,
                        background: 'transparent',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        cursor: 'pointer',
                    }}>Log Out</button>
                )}
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    style={{
                        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
