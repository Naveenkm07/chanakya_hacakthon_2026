import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/localAuth';

interface FormState {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormState>({ name: '', email: '', password: '' });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // ── Helpers ─────────────────────────────────────────────────────────────
    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validate = (): string => {
        if (!form.name.trim()) return 'Name is required.';
        if (!isValidEmail(form.email)) return 'Please enter a valid email address.';
        if (form.password.length < 6) return 'Password must be at least 6 characters.';
        return '';
    };

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await register(form.name.trim(), form.email.trim().toLowerCase(), form.password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err?.message ?? 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>🕉 Sanskrit Chant System</h1>
                    <h2 style={styles.subtitle}>Create your account</h2>
                </div>

                {/* Error banner */}
                {error && (
                    <div style={styles.errorBanner} role="alert">
                        ⚠️ {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate style={styles.form}>
                    <label style={styles.label} htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Arjuna Sharma"
                        value={form.name}
                        onChange={handleChange}
                        style={styles.input}
                        autoComplete="name"
                        required
                    />

                    <label style={styles.label} htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                        autoComplete="email"
                        required
                    />

                    <label style={styles.label} htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Min. 6 characters"
                        value={form.password}
                        onChange={handleChange}
                        style={styles.input}
                        autoComplete="new-password"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Creating account…' : 'Sign Up'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Already have an account?{' '}
                    <Link to="/" style={styles.link}>Go home</Link>
                </p>
            </div>
        </div>
    );
};

// ── Inline styles ────────────────────────────────────────────────────────────
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
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    },
    header: { textAlign: 'center', marginBottom: '1.75rem' },
    title: { fontSize: '1.1rem', color: '#e2c97e', margin: 0, letterSpacing: '0.05em' },
    subtitle: { fontSize: '1.5rem', color: '#ffffff', marginTop: '0.5rem', fontWeight: 700 },
    errorBanner: {
        background: 'rgba(239,68,68,0.18)',
        border: '1px solid rgba(239,68,68,0.4)',
        color: '#fca5a5',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1rem',
        fontSize: '0.9rem',
    },
    form: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
    label: { color: '#a0aec0', fontSize: '0.82rem', marginTop: '0.75rem', fontWeight: 600, letterSpacing: '0.03em' },
    input: {
        padding: '0.7rem 0.9rem',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.07)',
        color: '#ffffff',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    btn: {
        marginTop: '1.4rem',
        padding: '0.8rem',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(90deg, #e2c97e, #c9a227)',
        color: '#1a1a2e',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        letterSpacing: '0.04em',
        transition: 'transform 0.15s, opacity 0.15s',
    },
    footer: { textAlign: 'center', marginTop: '1.25rem', color: '#718096', fontSize: '0.88rem' },
    link: { color: '#e2c97e', textDecoration: 'none', fontWeight: 600 },
};

export default Signup;
