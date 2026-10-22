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

    // Ambient flying bats with varying depth
    class Bat {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        // Sebar posisi horizontal saat pertama kali dibuat agar langsung tampak di layar
        if (isInitial) {
          this.x = Math.random() * width;
        } else {
          this.x = Math.random() > 0.5 ? -60 : width + 60;
        }

        // Sebar ketinggian terbang (dari langit atas hingga separuh layar)
        this.y = Math.random() * (height * 0.65) + 30;

        const direction = isInitial ? (Math.random() > 0.5 ? 1 : -1) : (this.x < 0 ? 1 : -1);
        this.speedX = direction * (Math.random() * 1.5 + 0.9);
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 9 + 12; // Ukuran sayap lebih tegas dan tampak jelas (12-21px)
        this.wingAngle = Math.random() * Math.PI;
        this.wingSpeed = Math.random() * 0.08 + 0.12;
        // Opasitas tinggi & jelas (0.65 - 0.90) agar sangat kontras terlihat di layar
        this.opacity = (Math.random() * 0.25 + 0.65).toFixed(2);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wingAngle += this.wingSpeed;

        if (this.speedX > 0 && this.x > width + 70) this.reset();
        if (this.speedX < 0 && this.x < -70) this.reset();
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        if (this.speedX < 0) c.scale(-1, 1);

        // Efek aura cahaya bulan / oranye temaram agar siluet semakin kontras & jelas
        c.shadowColor = 'rgba(249, 115, 22, 0.65)';
        c.shadowBlur = 6;
        c.fillStyle = `rgba(248, 250, 252, ${this.opacity})`;
        c.beginPath();

        const wingFlap = Math.sin(this.wingAngle) * (this.size * 0.55);
        c.moveTo(0, 0);
        c.quadraticCurveTo(this.size * 0.6, -this.size * 0.8 - wingFlap, this.size, -this.size * 0.4 - wingFlap);
        c.quadraticCurveTo(this.size * 0.4, 0, 0, this.size * 0.2);
        c.quadraticCurveTo(-this.size * 0.4, 0, -this.size, -this.size * 0.4 - wingFlap);
        c.quadraticCurveTo(-this.size * 0.6, -this.size * 0.8 - wingFlap, 0, 0);

        c.fill();
        c.restore();
      }
    }

    // Menambah jumlah kelelawar menjadi 8 ekor (sebelumnya hanya 3)
    const bats = Array.from({ length: 8 }, () => new Bat(true));

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
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[15]"
    />
  );
}
