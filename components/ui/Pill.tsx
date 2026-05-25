export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-pale text-ink rounded-full text-xs sm:text-sm min-h-[32px] inline-flex items-center">
      {children}
    </span>
  );
}
