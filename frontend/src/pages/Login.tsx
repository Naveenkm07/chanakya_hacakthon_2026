import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please provide email and password');
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/api/login', {
                email: email.trim().toLowerCase(),
                password,
            });
            localStorage.setItem('userToken', response.data.token);
            if (response.data.user_name) {
                localStorage.setItem('userName', response.data.user_name);
            }
            navigate('/dashboard');
        } catch (err: any) {
            const detail = err?.response?.data?.detail;
            setError(detail ?? 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>🕉 Sanskrit Chant System</h1>
                    <h2 style={styles.subtitle}>Welcome back</h2>
                </div>

                {error && (
                    <div style={styles.errorBanner} role="alert">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={styles.form}>
                    <label style={styles.label} htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label} htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <button type="submit" disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={styles.link}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

// Reuse Signup styles roughly
const styles: Record<string, React.CSSProperties> = {
    page: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    card: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '2.5rem 2rem', width: '100%', maxWidth: '420px' },
    header: { textAlign: 'center', marginBottom: '1.75rem' },
    title: { fontSize: '1.1rem', color: '#e2c97e', margin: 0 },
    subtitle: { fontSize: '1.5rem', color: '#ffffff', marginTop: '0.5rem', fontWeight: 700 },
    errorBanner: { background: 'rgba(239,68,68,0.18)', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
    label: { color: '#a0aec0', fontSize: '0.82rem', marginTop: '0.75rem', fontWeight: 600 },
    input: { padding: '0.7rem 0.9rem', borderRadius: '8px', background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' },
    btn: { marginTop: '1.4rem', padding: '0.8rem', borderRadius: '8px', background: 'linear-gradient(90deg, #e2c97e, #c9a227)', color: '#1a1a2e', fontWeight: 700, border: 'none', cursor: 'pointer' },
    footer: { textAlign: 'center', marginTop: '1.25rem', color: '#718096', fontSize: '0.88rem' },
    link: { color: '#e2c97e', textDecoration: 'none', fontWeight: 600 },
};

export default Login;
