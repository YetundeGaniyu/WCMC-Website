export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 sm:p-6 bg-white shadow-card rounded">
      {children}
    </div>
  );
}
