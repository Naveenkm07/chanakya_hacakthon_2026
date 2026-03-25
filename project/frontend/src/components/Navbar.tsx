import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>🕉 Sanskrit Chants</div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                {!token ? (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={{ ...styles.link, ...styles.cta }}>Sign Up</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={{ ...styles.link, ...styles.btnOut }}>Log Out</button>
                )}
            </div>
        </nav>
    );
};

const styles: Record<string, React.CSSProperties> = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(26,26,46,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    logo: { color: '#e2c97e', fontSize: '1.2rem', fontWeight: 700 },
    links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
    link: { color: '#e2e8f0', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' },
    cta: { background: '#e2c97e', color: '#1a1a2e', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 600 },
    btnOut: { background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer' }
};

export default Navbar;
