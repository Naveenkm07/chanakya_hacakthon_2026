import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid
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

export const PitchGraph: React.FC<PitchGraphProps> = ({ data }) => {
    return (
        <div style={styles.container}>
            <div style={styles.chartBox}>
                <h3 style={styles.title}>Pitch Visualization (Hz)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="syllable" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <YAxis stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2c97e' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="pitch"
                            stroke="#e2c97e"
                            strokeWidth={3}
                            dot={{ fill: '#e2c97e', r: 5, strokeWidth: 2, stroke: '#1a202c' }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={styles.chartBox}>
                <h3 style={styles.title}>Rhythm Pattern (Seconds)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="syllable" stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <YAxis stroke="#a0aec0" tick={{ fill: '#a0aec0' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                            itemStyle={{ color: '#fde047' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="duration" fill="#c9a227" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
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
