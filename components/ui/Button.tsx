export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red text-white rounded text-sm sm:text-base font-medium min-h-[44px] hover:bg-red-dark transition-colors">
      {children}
    </button>
  );
}
