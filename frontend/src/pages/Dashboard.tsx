import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { logout } from '../services/localAuth';
import { PitchGraph, type ChantData } from '../components/PitchGraph';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('गुरुर्ब्रह्मा');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // API response state
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [graphData, setGraphData] = useState<ChantData[]>([]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const DEMO_SYLLABLES = ['गु', 'रु', 'ब्र', 'ह्मा', 'गु', 'रुः', 'वि', 'ष्णुः'];
    const DEMO_PITCH = [261, 293, 329, 349, 392, 440, 349, 329];
    const DEMO_DURATION = [0.4, 0.3, 0.5, 0.6, 0.4, 0.5, 0.3, 0.7];

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        setError('');
        setAudioUrl(null);
        setGraphData([]);

        try {
            const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
            const res = await api.post('/api/generate-chant', { text: text.trim() });
            const { audio_url, pitch, duration, syllables } = res.data;

            const formattedData: ChantData[] = syllables.map((syl: string, idx: number) => ({
                index: idx + 1,
                syllable: syl,
                pitch: pitch[idx],
                duration: duration[idx]
            }));

            setGraphData(formattedData);
            setAudioUrl(`${backendUrl}${audio_url}`);
        } catch {
            // Backend not available — show demo data and synthesize audio
            const demoData: ChantData[] = DEMO_SYLLABLES.map((syl, idx) => ({
                index: idx + 1,
                syllable: syl,
                pitch: DEMO_PITCH[idx],
                duration: DEMO_DURATION[idx]
            }));
            setGraphData(demoData);

            // Synthesize audio from pitch data using Web Audio API
            try {
                const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                const ctx = new AudioCtx();
                let time = ctx.currentTime + 0.1;
                DEMO_PITCH.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, time);
                    gain.gain.setValueAtTime(0.4, time);
                    gain.gain.exponentialRampToValueAtTime(0.001, time + DEMO_DURATION[idx]);
                    osc.start(time);
                    osc.stop(time + DEMO_DURATION[idx]);
                    time += DEMO_DURATION[idx] + 0.05;
                });
            } catch { /* audio not supported */ }

        } finally {
            setLoading(false);
        }

    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.pageTitle}>Dashboard</h1>
                <button onClick={handleLogout} style={styles.logoutBtn}>Log Out</button>
            </header>

            <div style={styles.grid}>
                {/* Controls Column */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Generate New Chant</h2>
                    <form onSubmit={handleGenerate} style={styles.form}>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter Sanskrit text here..."
                            style={styles.textarea}
                            rows={4}
                        />
                        {error && <div style={styles.error}>{error}</div>}
                        <button type="submit" disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Processing AI...' : 'Generate Chant ✨'}
                        </button>
                    </form>

                    {audioUrl && (
                        <div style={styles.audioSection}>
                            <h3 style={styles.sectionTitle}>Generated Chant Audio</h3>
                            <audio controls src={audioUrl} style={styles.audioPlayer} autoPlay>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>

                {/* Visualization Column */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Chant Analysis Overview</h2>
                    {graphData.length > 0 ? (
                        <PitchGraph data={graphData} />
                    ) : (
                        <div style={styles.emptyState}>
                            Generate a chant to see pitch and rhythm visualizations.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: 'calc(100vh - 70px)',
        backgroundColor: '#0a0f1c',
        color: '#fff',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    pageTitle: { color: '#e2c97e', fontSize: '2rem', margin: 0, fontWeight: 700 },
    logoutBtn: { padding: '0.4rem 1.2rem', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', alignItems: 'start' },
    card: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
    cardTitle: { color: '#fff', fontSize: '1.4rem', margin: '0 0 1.5rem 0', fontWeight: 600, letterSpacing: '0.02em' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    textarea: { width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '1.2rem', resize: 'vertical', outline: 'none' },
    btn: { padding: '1rem', borderRadius: '12px', background: 'linear-gradient(90deg, #e2c97e, #fde047)', color: '#0a0f1c', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(226, 201, 126, 0.2)' },
    error: { color: '#fca5a5', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' },
    audioSection: { marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' },
    sectionTitle: { color: '#a0aec0', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 },
    audioPlayer: { width: '100%', outline: 'none', borderRadius: '8px' },
    emptyState: { color: '#64748b', padding: '4rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.01)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }
};

export default Dashboard;
