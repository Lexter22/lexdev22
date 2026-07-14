export function Pin({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute z-10 ${className}`}>
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-[var(--color-muted-light)] border border-[var(--color-border-strong)] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]" />
        <div className="absolute top-[3px] left-[3px] w-1.5 h-1.5 rounded-full bg-[var(--color-border-strong)] opacity-40" />
      </div>
    </div>
  );
}

export function EvidenceTape({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[var(--color-accent)] text-[var(--bg)] px-2 py-0.5 rotate-[-1deg]">
      <span className="text-[8px] tracking-[0.2em] font-[family-name:var(--font-mono)] font-bold uppercase">
        {children}
      </span>
    </div>
  );
}
