import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>🕉 Sanskrit Chant Generation System</h1>
                <p style={styles.subtitle}>
                    Generate authentic Sanskrit chants powered by AI. Get started by creating your account.
                </p>
                <Link to="/signup" style={styles.btn}>
                    Create Account →
                </Link>
                <p style={styles.note}>Phase 1 — Foundation Ready ✅</p>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '1rem',
    },
    card: {
        textAlign: 'center',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        maxWidth: '520px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    },
    title: { color: '#e2c97e', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 700 },
    subtitle: { color: '#a0aec0', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' },
    btn: {
        display: 'inline-block',
        padding: '0.8rem 2rem',
        borderRadius: '8px',
        background: 'linear-gradient(90deg, #e2c97e, #c9a227)',
        color: '#1a1a2e',
        fontWeight: 700,
        fontSize: '1rem',
        textDecoration: 'none',
        letterSpacing: '0.04em',
    },
    note: { color: '#4a5568', fontSize: '0.8rem', marginTop: '2rem' },
};

export default Home;
