import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; r: number; dx: number; dy: number; dz: number; z: number; color: string }[] = [];
        const isDark = theme === 'dark';
        const colors = isDark
            ? ['rgba(226,201,126,', 'rgba(100,150,255,', 'rgba(255,100,200,', 'rgba(80,220,180,']
            : ['rgba(100,80,200,', 'rgba(200,80,120,', 'rgba(80,150,200,', 'rgba(120,80,200,'];

        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.6,
                dy: (Math.random() - 0.5) * 0.6,
                dz: (Math.random() - 0.5) * 0.02,
                z: Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        let animId: number;
        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.005;

            particles.forEach(p => {
                // 4D-like: oscillate size using z + time
                const perspective = 1 + Math.sin(p.z * Math.PI * 2 + time) * 0.5;
                const size = p.r * perspective;
                const alpha = 0.3 + 0.5 * Math.abs(Math.sin(p.z * Math.PI + time));

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4);
                gradient.addColorStop(0, `${p.color}${alpha.toFixed(2)})`);
                gradient.addColorStop(1, `${p.color}0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;
                p.z += p.dz;

                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
                if (p.z < 0 || p.z > 1) p.dz *= -1;
            });

            // Connect nearby particles with lines
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = isDark
                            ? `rgba(226,201,126,${0.05 * (1 - dist / 120)})`
                            : `rgba(100,80,200,${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default AnimatedBackground;
