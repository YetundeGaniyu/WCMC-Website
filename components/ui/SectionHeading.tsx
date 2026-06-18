export default function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 sm:mb-6 ${className || ''}`}>
      {children}
    </h2>
  );
}
