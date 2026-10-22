import { useEffect, useRef } from 'react';

export default function SpookyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle, minimal drifting dust particles
    const spores = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.6,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.25 + 0.08,
      color: Math.random() > 0.6 ? 'rgba(234, 88, 12,' : 'rgba(139, 92, 246,'
    }));

    // Rare, subtle distant bats
    class Bat {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() > 0.5 ? -40 : width + 40;
        this.y = Math.random() * (height * 0.4) + 40;
        this.speedX = (this.x < 0 ? 1 : -1) * (Math.random() * 1.2 + 0.8);
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 7 + 7;
        this.wingAngle = 0;
        this.wingSpeed = 0.12;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wingAngle += this.wingSpeed;

        if (this.speedX > 0 && this.x > width + 60) this.reset();
        if (this.speedX < 0 && this.x < -60) this.reset();
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        if (this.speedX < 0) c.scale(-1, 1);

        // Soft silhouette opacity
        c.fillStyle = 'rgba(255, 255, 255, 0.12)';
        c.beginPath();

        const wingFlap = Math.sin(this.wingAngle) * (this.size * 0.5);
        c.moveTo(0, 0);
        c.quadraticCurveTo(this.size * 0.6, -this.size * 0.8 - wingFlap, this.size, -this.size * 0.4 - wingFlap);
        c.quadraticCurveTo(this.size * 0.4, 0, 0, this.size * 0.2);
        c.quadraticCurveTo(-this.size * 0.4, 0, -this.size, -this.size * 0.4 - wingFlap);
        c.quadraticCurveTo(-this.size * 0.6, -this.size * 0.8 - wingFlap, 0, 0);

        c.fill();
        c.restore();
      }
    }

    const bats = Array.from({ length: 3 }, () => new Bat());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle particles
      for (const s of spores) {
        s.x += s.dx;
        s.y += s.dy;
        if (s.y < 0) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color} ${s.alpha})`;
        ctx.fill();
      }

      // Rare distant bats
      for (const b of bats) {
        b.update();
        b.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[1]"
    />
  );
}
