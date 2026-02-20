export default function Footer() {
  return (
    <footer className="mt-auto w-full py-4 text-center">
      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          letterSpacing: '0.05em',
          opacity: 0.6,
        }}
      >
        Developed by{' '}
        <span
          style={{
            background: 'linear-gradient(90deg, #7C3AED, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          Mandip Goswami
        </span>
      </p>
    </footer>
  );
}
