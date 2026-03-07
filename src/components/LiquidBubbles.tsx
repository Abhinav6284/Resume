"use client";
import React, { useRef, useEffect } from "react";

export default function LiquidBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    class Bubble {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = (canvas?.height || window.innerHeight) + Math.random() * 100;
        this.size = Math.random() * 60 + 20; // 20 to 80
        this.speedY = Math.random() * 1 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.05; // 0.05 to 0.35
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (canvas && this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Fluid gradient for bubble
        const gradient = ctx.createRadialGradient(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          this.size * 0.1,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, `rgba(46, 107, 255, ${this.opacity})`); // Primary
        gradient.addColorStop(1, `rgba(0, 194, 168, 0)`);       // Accent clear
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      }
    }

    const initBubbles = () => {
      bubbles = [];
      const numBubbles = Math.floor(window.innerWidth / 30); // Adaptive amount
      for (let i = 0; i < numBubbles; i++) {
        bubbles.push(new Bubble());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-2] opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
