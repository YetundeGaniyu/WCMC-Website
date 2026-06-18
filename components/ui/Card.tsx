export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-paper rounded-lg shadow-card border border-line-soft overflow-hidden ${className || 'p-4 sm:p-6'}`}>
      {children}
    </div>
  );
}
