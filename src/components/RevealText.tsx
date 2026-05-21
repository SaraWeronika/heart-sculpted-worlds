import { useEffect, useRef } from "react";

type Props = { children: React.ReactNode; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p" | "span" };

export function Reveal({ children, className = "", delay = 0, as = "h2" }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animation = `fade-up 1.2s ${delay}ms var(--ease-cinema) both`;
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Tag = as as keyof React.JSX.IntrinsicElements;
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
