import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// ── 3D Components ─────────────────────────────────────────────────────────────

const FloatingText: React.FC = () => {
    const textRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Animate position (floating up and down)
        textRef.current.position.y = Math.sin(t * 1.5) * 0.2 + 1;
        // Animate rotation (slowly spinning)
        textRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    });

    return (
        <Text
            ref={textRef}
            position={[0, 1, 0]}
            fontSize={1.4}
            color="#e2c97e"
            anchorX="center"
            anchorY="middle"
        >
            संस्कृतम्
        </Text>
    );
};

const SoundWaves: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const barCount = 15;
    const bars = Array.from({ length: barCount });

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        groupRef.current.children.forEach((mesh, i) => {
            // Sine wave animation for heights resembling an audio equalizer
            const scaleY = Math.max(0.2, Math.sin(t * 4 + i * 0.5) * 1.5 + 1.5);
            mesh.scale.y = scaleY;
            mesh.position.y = scaleY / 2 - 2; // Keep bottom aligned

            // Add slight color pulsing
            const mat = (mesh as THREE.Mesh).material as THREE.MeshStandardMaterial;
            const intensity = Math.max(0.2, Math.sin(t * 5 + i * 0.4));
            mat.emissiveIntensity = intensity;
        });
    });

    return (
        <group ref={groupRef}>
            {bars.map((_, i) => (
                <mesh key={i} position={[(i - barCount / 2) * 0.45, -2, 0]}>
                    <boxGeometry args={[0.2, 1, 0.2]} />
                    <meshStandardMaterial
                        color="#c9a227"
                        emissive="#e2c97e"
                        emissiveIntensity={0.5}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
};

// ── Main Page Component ───────────────────────────────────────────────────────

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>

            {/* 3D Background Canvas */}
            <div style={styles.canvasContainer}>
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e2c97e" />

                    {/* 3D Elements */}
                    <FloatingText />
                    <SoundWaves />
                </Canvas>
            </div>

            {/* HTML UI Overlay */}
            <div style={styles.overlay}>
                <div style={styles.contentCard}>
                    <h1 style={styles.title}>🕉 Sanskrit Chant System</h1>
                    <p style={styles.subtitle}>
                        Experience the divine resonance. Generate authentic, AI-powered Sanskrit chants instantly.
                    </p>
                    <button onClick={() => navigate('/dashboard')} style={styles.btn}>
                        Generate Chant →
                    </button>
                </div>
            </div>

        </div>
    );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 70px)', // adjust for navbar
        overflow: 'hidden',
        backgroundColor: '#0a0f1c', // Deep dark theme background
    },
    canvasContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none', // Let mouse interact with 3D canvas where there's no UI
        background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 15, 28, 0.85) 100%)',
    },
    contentCard: {
        pointerEvents: 'auto',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '3rem 2rem',
        maxWidth: '600px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        transform: 'translateY(-20px)', // bump it up slightly from dead center
    },
    title: {
        color: '#e2c97e',
        fontSize: '2.5rem',
        fontWeight: 800,
        margin: '0 0 1rem 0',
        textShadow: '0 4px 20px rgba(226, 201, 126, 0.3)',
        letterSpacing: '0.05em',
    },
    subtitle: {
        color: '#cbd5e1',
        fontSize: '1.1rem',
        lineHeight: 1.6,
        margin: '0 auto 2.5rem auto',
        maxWidth: '480px',
    },
    btn: {
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#0a0f1c',
        background: 'linear-gradient(90deg, #e2c97e, #fde047)',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(226, 201, 126, 0.25)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    }
};

export default Landing;
