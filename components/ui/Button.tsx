export default function Button({ children, className, type = 'button', disabled = false }: { children: React.ReactNode; className?: string; type?: 'button' | 'submit' | 'reset'; disabled?: boolean }) {
  return (
    <button type={type} disabled={disabled} className={`px-4 sm:px-6 py-2.5 sm:py-3 bg-red text-white rounded text-sm sm:text-base font-medium min-h-[44px] hover:bg-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}>
      {children}
    </button>
  );
}
