"use client";

import { useEffect, useRef } from "react";

export default function Ambient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const around = 176, strands = 56, count = around * strands;
    const geometry = new Float32Array(count * 6);
    const projected = new Float32Array(count * 5);
    const order = Array.from({ length: count }, (_, index) => index);
    const colors = Array.from({ length: 128 }, (_, i) => `hsl(${27 + i * .14} 57% ${9 + i * .59}%)`);
    let width = 1, height = 1, frame = 0, last = 0, time = 0, inView = true;
    let pointerX = 0, pointerY = 0, easedX = 0, easedY = 0;

    // A flattened ribbon swept around a (2, 3) torus knot. Its half twist closes seamlessly.
    for (let j = 0; j < strands; j++) {
      const v = j / strands * Math.PI * 2, cv = Math.cos(v), sv = Math.sin(v);
      for (let i = 0; i < around; i++) {
        const u = i / around * Math.PI * 2, a = 2 * u;
        const r = 1 + .27 * Math.cos(3 * u), dr = -.81 * Math.sin(3 * u);
        const ca = Math.cos(a), sa = Math.sin(a);
        let tx = dr * ca - 2 * r * sa, ty = dr * sa + 2 * r * ca, tz = .96 * Math.cos(3 * u);
        const length = Math.hypot(tx, ty, tz);
        tx /= length; ty /= length; tz /= length;
        const dot = tx * ca + ty * sa;
        let nx = ca - tx * dot, ny = sa - ty * dot, nz = -tz * dot;
        const normalLength = Math.hypot(nx, ny, nz);
        nx /= normalLength; ny /= normalLength; nz /= normalLength;
        const bx = ty * nz - tz * ny, by = tz * nx - tx * nz, bz = tx * ny - ty * nx;
        const twist = u / 2, c = Math.cos(twist), s = Math.sin(twist);
        const ax = nx * c + bx * s, ay = ny * c + by * s, az = nz * c + bz * s;
        const dx = bx * c - nx * s, dy = by * c - ny * s, dz = bz * c - nz * s;
        const index = (j * around + i) * 6;
        geometry[index] = r * ca + .19 * cv * ax + .058 * sv * dx;
        geometry[index + 1] = r * sa + .19 * cv * ay + .058 * sv * dy;
        geometry[index + 2] = .32 * Math.sin(3 * u) + .19 * cv * az + .058 * sv * dz;
        const gx = cv * ax / .19 + sv * dx / .058;
        const gy = cv * ay / .19 + sv * dy / .058;
        const gz = cv * az / .19 + sv * dz / .058;
        const gl = Math.hypot(gx, gy, gz);
        geometry.set([gx / gl, gy / gl, gz / gl], index + 3);
      }
    }

    const draw = (now: number) => {
      frame = 0;
      if (document.hidden || !inView) return;
      if (!motion.matches) frame = requestAnimationFrame(draw);
      if (last && now - last < 32) return;
      if (!motion.matches) time += Math.min(now - (last || now), 64) * .00012;
      last = now;
      easedX += (pointerX - easedX) * .035;
      easedY += (pointerY - easedY) * .035;
      const cy = Math.cos(.58 + Math.sin(time) * .07 + easedX * .12);
      const sy = Math.sin(.58 + Math.sin(time) * .07 + easedX * .12);
      const cp = Math.cos(-.32 + easedY * .1), sp = Math.sin(-.32 + easedY * .1);
      const cr = Math.cos(-.48), sr = Math.sin(-.48);
      const rotate = (x: number, y: number, z: number) => {
        const xx = x * cy + z * sy, zz = z * cy - x * sy, yy = y * cp - zz * sp;
        return [xx * cr - yy * sr, xx * sr + yy * cr, y * sp + zz * cp];
      };
      const mobile = width < 768;
      const scale = Math.min(width * (mobile ? .39 : .255), height * .32);
      for (let i = 0; i < count; i++) {
        const g = i * 6, p = i * 5;
        const [x, y, z] = rotate(geometry[g], geometry[g + 1], geometry[g + 2]);
        const [nx, ny, nz] = rotate(geometry[g + 3], geometry[g + 4], geometry[g + 5]);
        const perspective = 4 / (4 - z);
        const diffuse = Math.max(0, -nx * .45 - ny * .62 + nz * .64);
        const highlight = Math.pow(Math.max(0, -nx * .3 - ny * .35 + nz * .88), 30);
        const rib = .93 + .07 * Math.cos(Math.floor(i / around) * Math.PI);
        projected.set([width * (mobile ? .57 : .67) + x * scale * perspective,
          height * .5 + y * scale * perspective, z, (.11 + diffuse * .62 + highlight * .5) * rib, nz], p);
      }
      context.clearRect(0, 0, width, height);
      order.sort((a, b) => projected[a * 5 + 2] - projected[b * 5 + 2]);
      context.lineCap = "round";
      for (const index of order) {
        const p = index * 5;
        if (projected[p + 4] < -.06) continue;
        const next = (index % around === around - 1 ? (index - around + 1 + count / 2) % count : index + 1) * 5;
        const neighbor = ((index + around) % count) * 5;
        context.lineWidth = Math.max(.7, Math.hypot(projected[p] - projected[neighbor], projected[p + 1] - projected[neighbor + 1]) * 1.08);
        context.strokeStyle = colors[Math.min(127, Math.round(projected[p + 3] * 127))];
        context.beginPath();
        context.moveTo(projected[p], projected[p + 1]);
        context.lineTo(projected[next], projected[next + 1]);
        context.stroke();
      }
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (!document.hidden && inView) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0); sync();
    };
    const move = (event: PointerEvent) => {
      if (motion.matches) return;
      pointerX = event.clientX / window.innerWidth - .5;
      pointerY = event.clientY / window.innerHeight - .5;
    };
    const changeMotion = () => { pointerX = pointerY = easedX = easedY = 0; sync(); };
    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    resizeObserver.observe(canvas); intersection.observe(canvas); resize();
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", changeMotion);
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", changeMotion);
    };
  }, []);

  return <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
  </div>;
}
