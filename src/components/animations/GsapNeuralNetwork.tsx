"use client";

import { useEffect, useRef } from "react";

interface SkillNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  radius: number;
}

const SKILL_LABELS = [
  "Next.js", "React", "TypeScript", "Python", 
  "Supabase", "LLMs", "GSAP", "RAG", "System Design",
  "Git", "NLP", "C++", "Java", "Docker"
];

export default function GsapNeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId: number;
    let width = 0;
    let height = 0;
    let nodes: SkillNode[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-initialize nodes when resized
      initNodes();
    };

    const initNodes = () => {
      nodes = SKILL_LABELS.map((label) => {
        const radius = ctx.measureText(label).width / 2 + 10;
        return {
          x: Math.random() * (width - 100) + 50,
          y: Math.random() * (height - 60) + 30,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          label,
          radius,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background network connections
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(222, 219, 200, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouseRef.current.active) {
          const mDist = Math.hypot(n1.x - mouseRef.current.x, n1.y - mouseRef.current.y);
          if (mDist < maxDistance + 40) {
            const alpha = (1 - mDist / (maxDistance + 40)) * 0.35;
            ctx.strokeStyle = `rgba(222, 219, 200, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // Update positions
        if (!prefersReducedMotion) {
          n1.x += n1.vx;
          n1.y += n1.vy;

          // Mouse push/pull physics
          if (mouseRef.current.active) {
            const dx = n1.x - mouseRef.current.x;
            const dy = n1.y - mouseRef.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              const force = (120 - dist) / 120 * 0.05;
              n1.vx += (dx / dist) * force;
              n1.vy += (dy / dist) * force;
            }
          }

          // Friction/dampening
          n1.vx *= 0.98;
          n1.vy *= 0.98;

          // Boundary bounce with padding
          const pad = 10;
          if (n1.x < pad || n1.x > width - pad) n1.vx *= -1;
          if (n1.y < pad || n1.y > height - pad) n1.vy *= -1;

          // Clamp velocity
          const speedLimit = 1.2;
          const currentSpeed = Math.hypot(n1.vx, n1.vy);
          if (currentSpeed > speedLimit) {
            n1.vx = (n1.vx / currentSpeed) * speedLimit;
            n1.vy = (n1.vy / currentSpeed) * speedLimit;
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#DEDBC8";
        ctx.fill();

        // Draw node text label
        ctx.font = "11px Courier New, Courier, monospace";
        ctx.fillStyle = "rgba(225, 224, 204, 0.7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n1.label, n1.x, n1.y - 12);
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] md:h-[350px] border border-white/5 rounded-2xl md:rounded-3xl bg-[#070707] overflow-hidden"
    >
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
          Interactive Neural Skills Map
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-crosshair"
      />
    </div>
  );
}
