import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { categories, projects, getProjectsByCategory } from '../assets/projectsData';
import NeuralBrainBg from '../images/neural-brain-bg.png';

/* ───── tiny helper: live clock ───── */
const useClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

/* ─────────────────── HERO ─────────────────── */
const Hero = () => {
  const time = useClock();
  const canvasRef = useRef(null);

  /* Neural-net particle background */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 80;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,245,${0.12 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      /* dots */
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,245,245,0.35)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Static neural brain background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${NeuralBrainBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Animated canvas overlay for subtle particle movement */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Radial glow overlays to enhance depth */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(0,245,245,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,81,250,0.04) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, rgba(13,11,33,0) 30%, rgba(13,11,33,0.7) 70%, rgba(13,11,33,0.95) 100%)',
      }} />

      {/* Content */}
      <div className="relative text-center max-w-4xl px-6" style={{ zIndex: 10 }}>
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-lg"
          style={{ background: 'rgba(37,34,66,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(72,69,94,0.25)' }}>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant font-label">
            Advanced Computer Vision
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline font-extrabold leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.2rem)' }}>
          <span className="text-on-surface">Deep Learning Cluster:</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #00f5f5 0%, #a68cff 50%, #ff51fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Convolutional Neural Networks
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-body">
          Exploring the architectural frontiers of spatial intelligence through
          high-frequency neural processing and real-time inference clusters.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link
            to="/autonomous-driving"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-on-primary-fixed no-underline transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00f5f5, #00e6e6)', boxShadow: '0 0 30px -8px rgba(0,245,245,0.4)' }}
          >
            Explore Architecture
          </Link>
          <a
            href="https://github.com/fwbrandao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-on-surface no-underline transition-all hover:scale-105"
            style={{ background: 'rgba(37,34,66,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(72,69,94,0.3)' }}
          >
            System Specs
            <span className="material-symbols-outlined text-base">north_east</span>
          </a>
        </div>
      </div>

      {/* Bottom-left coordinates overlay */}
      <div className="absolute bottom-10 left-10 space-y-1 font-label" style={{ zIndex: 10 }}>
        <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50">
          COORD // 40.7128° N
        </p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50">
          TIME // {time}
        </p>
      </div>
    </section>
  );
};

/* ─────────────────── PROJECT CARD ─────────────────── */
const ProjectCard = ({ project }) => (
  <Link
    to={project.link}
    className="group block rounded-lg overflow-hidden no-underline transition-all duration-300 hover:scale-[1.02]"
    style={{
      background: 'rgba(37,34,66,0.45)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(72,69,94,0.18)',
    }}
  >
    {/* Icon area */}
    <div className="h-44 flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(30,28,57,0.9), rgba(18,16,41,0.95))' }}>
      <span
        className="material-symbols-outlined text-[5rem] text-cyan-400/15 group-hover:text-cyan-400/30 transition-all duration-500"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {project.icon}
      </span>
      {/* Tag */}
      <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.15em] font-bold px-3 py-1 rounded-full"
        style={{
          background: project.tagColor === 'secondary' ? 'rgba(255,81,250,0.12)' : 'rgba(0,245,245,0.12)',
          color: project.tagColor === 'secondary' ? '#ff51fa' : '#00f5f5',
          border: `1px solid ${project.tagColor === 'secondary' ? 'rgba(255,81,250,0.2)' : 'rgba(0,245,245,0.2)'}`,
        }}
      >
        {project.tag}
      </span>
    </div>

    {/* Text */}
    <div className="p-6 space-y-2">
      <h3 className="text-lg font-bold text-on-surface font-headline group-hover:text-cyan-200 transition-colors">
        {project.title}
      </h3>
      <p className="text-xs text-on-surface-variant font-body leading-relaxed line-clamp-2">
        {project.description}
      </p>
    </div>
  </Link>
);

/* ─────────────────── CATEGORY SECTION ─────────────────── */
const CategorySection = ({ category }) => {
  const catProjects = getProjectsByCategory(category.id);
  if (catProjects.length === 0) return null;

  return (
    <section className="mb-20">
      {/* Category header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,245,245,0.08)' }}>
          <span className="material-symbols-outlined text-cyan-400 text-xl">{category.icon}</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface font-headline">{category.title}</h2>
          <p className="text-xs text-on-surface-variant font-label uppercase tracking-[0.1em] mt-0.5">
            {catProjects.length} {catProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
};

/* ─────────────────── LANDING PAGE ─────────────────── */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <Hero />

      {/* Neural Portfolios section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-extrabold text-on-surface font-headline mb-2">Neural Portfolios</h2>
        <p className="text-on-surface-variant mb-16 font-body max-w-xl">
          A curated collection of deep learning, data science, and web engineering projects.
        </p>

        {categories.map((cat) => <CategorySection key={cat.id} category={cat} />)}
      </div>
    </div>
  );
};

export default LandingPage;
