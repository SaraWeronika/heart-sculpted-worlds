import { useEffect, useRef, useState } from "react";

/**
 * Synthesizes a warm ambient pad + subtle heartbeat with WebAudio.
 * No autoplay: starts only on user toggle.
 */
export function AudioController() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (!on) return;
    const Ctor = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    // Warm pad: 3 detuned sine oscillators through a slow lowpass
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 700;
    lp.Q.value = 0.6;
    lp.connect(master);

    const oscs = [110, 110 * 1.5, 110 * 2.005].map((f) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.18;
      o.connect(g).connect(lp);
      o.start();
      return o;
    });

    // LFO on filter for warm movement
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain).connect(lp.frequency);
    lfo.start();

    // Heartbeat: two muffled thumps per ~1s
    const heartGain = ctx.createGain();
    heartGain.gain.value = 0.5;
    heartGain.connect(master);

    let beatTimer: number | null = null;
    const scheduleBeat = () => {
      const now = ctx.currentTime;
      const beat = (offset: number, vel: number) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(80, now + offset);
        o.frequency.exponentialRampToValueAtTime(40, now + offset + 0.25);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, now + offset);
        g.gain.linearRampToValueAtTime(vel, now + offset + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.35);
        o.connect(g).connect(heartGain);
        o.start(now + offset);
        o.stop(now + offset + 0.4);
      };
      beat(0, 0.55);
      beat(0.28, 0.4);
      beatTimer = window.setTimeout(scheduleBeat, 1050);
    };
    scheduleBeat();

    nodesRef.current = {
      stop: () => {
        if (beatTimer) clearTimeout(beatTimer);
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        oscs.forEach((o) => setTimeout(() => { try { o.stop(); } catch { /* noop */ } }, 900));
        try { lfo.stop(); } catch { /* noop */ }
        setTimeout(() => ctx.close(), 1100);
      },
    };

    return () => { nodesRef.current?.stop(); };
  }, [on]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Disattiva suono ambient" : "Attiva suono ambient"}
      className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full border border-ivory/20 bg-carbon/60 backdrop-blur flex items-center justify-center text-ivory hover:border-primary transition-all duration-500 group"
    >
      <span className="absolute inset-0 rounded-full" style={{ animation: on ? "pulse-soft 1.1s ease-in-out infinite" : "none", boxShadow: on ? "0 0 30px -5px var(--color-primary)" : "none" }} />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        {on ? (
          <>
            <path d="M3 10v4h4l5 5V5L7 10H3z" />
            <path d="M16 8c1.5 1 2.5 2.5 2.5 4s-1 3-2.5 4" />
            <path d="M19 5c2.5 1.7 4 4.2 4 7s-1.5 5.3-4 7" opacity="0.5" />
          </>
        ) : (
          <>
            <path d="M3 10v4h4l5 5V5L7 10H3z" />
            <line x1="17" y1="9" x2="23" y2="15" />
            <line x1="23" y1="9" x2="17" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
