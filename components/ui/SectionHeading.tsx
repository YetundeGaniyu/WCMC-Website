export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 sm:mb-6">
      {children}
    </h2>
  );
}
