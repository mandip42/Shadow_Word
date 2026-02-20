import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import Footer from '@/components/ui/Footer';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { InstallPrompt } from '@/components/ui/InstallPrompt';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shadow Word — Premium PWA Party Game',
  description: 'The ultimate social deduction word game for 2–16 players. Install and play offline.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Shadow Word',
  },
};

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('shadow-word-settings');if(t){try{var s=JSON.parse(t);if(s.state&&s.state.theme){document.documentElement.setAttribute('data-theme',s.state.theme);}}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <AnimatedBackground />
        <main className="flex min-h-screen flex-1 flex-col items-center px-4 pb-6 pt-6 sm:px-6 sm:pt-8">
          <div className="w-full max-w-lg flex flex-col flex-1 min-h-0">
            {children}
          </div>
        </main>
        <Footer />
        <InstallPrompt />
      </body>
    </html>
  );
}
