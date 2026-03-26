import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area,
    ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';

export interface ChantData {
    index: number;
    pitch: number;
    duration: number;
    syllable: string;
}

interface PitchGraphProps {
    data: ChantData[];
}

// ── Custom Canvas Waveform ───────────────────────────────────────────────────
const WaveformCanvas: React.FC<{ data: ChantData[] }> = ({ data }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data.length) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // Draw waveform for each syllable
        const segW = W / data.length;
        data.forEach((d, i) => {
            const freq = d.pitch;
            const amp = (d.duration / Math.max(...data.map(x => x.duration))) * (H / 2.5);
            const cycles = freq / 60;
            ctx.beginPath();
            for (let x = 0; x < segW; x++) {
                const t = x / segW;
                const y = H / 2 + amp * Math.sin(2 * Math.PI * cycles * t);
                if (x === 0) ctx.moveTo(i * segW + x, y);
                else ctx.lineTo(i * segW + x, y);
            }
            const hue = 30 + (freq - 200) / 3;
            ctx.strokeStyle = `hsl(${hue}, 85%, 62%)`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Syllable label
            ctx.fillStyle = 'rgba(226,201,126,0.8)';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(d.syllable, i * segW + segW / 2, H - 6);
        });

        // Center line
        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
    }, [data]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={160}
            style={{ width: '100%', height: '160px', borderRadius: '8px' }}
        />
    );
};

// ── Custom Canvas Spectrogram ────────────────────────────────────────────────
const SpectrogramCanvas: React.FC<{ data: ChantData[] }> = ({ data }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data.length) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const colW = W / data.length;
        const maxPitch = Math.max(...data.map(d => d.pitch));
        const minPitch = Math.min(...data.map(d => d.pitch));

        data.forEach((d, i) => {
            const freqBands = 32;
            for (let band = 0; band < freqBands; band++) {
                const bandFreq = minPitch + ((maxPitch - minPitch) * band) / freqBands;
                const distance = Math.abs(d.pitch - bandFreq);
                const intensity = Math.max(0, 1 - distance / 100) * d.duration * 2;
                const r = Math.floor(intensity * 226);
                const g = Math.floor(intensity * 100);
                const b = Math.floor(intensity * 30 + 40);
                ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, intensity + 0.1)})`;
                const y = H - (band / freqBands) * H;
                const h = H / freqBands + 1;
                ctx.fillRect(i * colW, y, colW - 1, h);
            }
            // Label
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(d.syllable, i * colW + colW / 2, H - 2);
        });
    }, [data]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={150}
            style={{ width: '100%', height: '150px', borderRadius: '8px' }}
        />
    );
};

// ── Main PitchGraph Component ────────────────────────────────────────────────
export const PitchGraph: React.FC<PitchGraphProps> = ({ data }) => {
    const maxPitch = Math.max(...data.map(d => d.pitch));

    // Radar data: normalize pitch and duration per syllable
    const radarData = data.map(d => ({
        syllable: d.syllable,
        Pitch: Math.round((d.pitch / maxPitch) * 100),
        Duration: Math.round((d.duration / Math.max(...data.map(x => x.duration))) * 100),
        Energy: Math.round(((d.pitch * d.duration) / (maxPitch * Math.max(...data.map(x => x.duration)))) * 100),
    }));

    // Bubble/scatter data: pitch vs duration sized by energy
    const bubbleData = data.map(d => ({
        x: d.pitch,
        y: d.duration,
        z: Math.round(d.pitch * d.duration),
        name: d.syllable,
    }));

    const COLORS = ['#e2c97e', '#fde047', '#f97316', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#ef4444'];

    const tooltip = {
        contentStyle: { backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' },
        itemStyle: { color: '#e2c97e' }
    };

    return (
        <div style={styles.container}>
            {/* 1. Pitch Line Chart (existing, untouched) */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>📈 Pitch Visualization (Hz)</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="syllable" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <YAxis stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <Tooltip {...tooltip} />
                        <Line type="monotone" dataKey="pitch" stroke="#e2c97e" strokeWidth={3}
                            dot={{ fill: '#e2c97e', r: 5, strokeWidth: 2, stroke: '#1a202c' }} activeDot={{ r: 7 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 2. Rhythm Bar Chart (existing, untouched) */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>🥁 Rhythm Pattern (Seconds)</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="syllable" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <YAxis stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <Tooltip {...tooltip} itemStyle={{ color: '#fde047' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar dataKey="duration" radius={[6, 6, 0, 0]}>
                            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 3. Stacked Area — Pitch + Energy Overlay */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>🌊 Energy Envelope</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <defs>
                            <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e2c97e" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#e2c97e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="durGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="syllable" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <YAxis stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <Tooltip {...tooltip} />
                        <Area type="monotone" dataKey="pitch" stroke="#e2c97e" strokeWidth={2} fill="url(#pitchGrad)" name="Pitch (Hz)" />
                        <Area type="monotone" dataKey="duration" stroke="#06b6d4" strokeWidth={2} fill="url(#durGrad)" name="Duration (s)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* 4. Radar/Spider Chart */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>🕸️ Chant Properties Radar (Normalized %)</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData} outerRadius={100}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="syllable" tick={{ fill: '#a0aec0', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                        <Radar name="Pitch" dataKey="Pitch" stroke="#e2c97e" fill="#e2c97e" fillOpacity={0.25} strokeWidth={2} />
                        <Radar name="Duration" dataKey="Duration" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
                        <Radar name="Energy" dataKey="Energy" stroke="#ec4899" fill="#ec4899" fillOpacity={0.15} strokeWidth={2} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} />
                    </RadarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                    {[['#e2c97e', 'Pitch'], ['#06b6d4', 'Duration'], ['#ec4899', 'Energy']].map(([c, l]) => (
                        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
                        </span>
                    ))}
                </div>
            </div>

            {/* 5. Bubble Chart — Pitch vs Duration vs Energy */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>🫧 Pitch × Duration Bubble Map</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="x" name="Pitch (Hz)" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} label={{ value: 'Pitch (Hz)', position: 'insideBottom', fill: '#64748b', fontSize: 11 }} />
                        <YAxis dataKey="y" name="Duration (s)" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} label={{ value: 'Duration (s)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
                        <ZAxis dataKey="z" range={[60, 400]} name="Energy" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                            formatter={(val: any, name: string) => [val, name]} />
                        <Scatter data={bubbleData} name="Syllables">
                            {bubbleData.map((entry, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* 6. Waveform Canvas */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>〰️ Sound Wave Simulation</h3>
                <WaveformCanvas data={data} />
            </div>

            {/* 7. Spectrogram Canvas */}
            <div style={styles.chartBox}>
                <h3 style={styles.title}>🌡️ Frequency Spectrogram</h3>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    Intensity map of frequency energy across each syllable
                </div>
                <SpectrogramCanvas data={data} />
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column' as const, gap: '2rem', width: '100%' },
    chartBox: {
        background: 'rgba(255,255,255,0.02)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.02)'
    },
    title: { color: '#e2c97e', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600, letterSpacing: '0.03em' }
};
