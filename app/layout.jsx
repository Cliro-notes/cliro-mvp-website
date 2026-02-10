import "./globals.css";
import Header from "./sections/header";
import Footer from "./sections/footer";
import { BackgroundElements } from "./ui/BackgroundElements";

export const metadata = {
  title: 'Cliro - Intelligent Note-Taking Chrome Extension for Productivity',
  description: 'Transform how you capture and organize information with Cliro. The AI-powered Chrome extension that makes research, learning, and productivity effortless. Join thousands on our waitlist.',
  keywords: [
    'Chrome extension',
    'note-taking',
    'productivity tool',
    'AI notes',
    'research assistant',
    'learning tool',
    'browser extension',
    'smart notes',
    'organization tool',
    'knowledge management',
    'study tool',
    'writing assistant'
  ].join(', '),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://cliro.tech',
    title: 'Cliro - Intelligent Note-Taking Chrome Extension',
    description: 'Transform how you capture and organize information with Cliro. The AI-powered Chrome extension.',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cliro - Intelligent Note-Taking Chrome Extension',
    description: 'Transform how you capture and organize information with Cliro.',
    images: '/og-image.png',
  },
};

// Viewport must be a separate export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />

        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Cliro",
              "description": "Intelligent note-taking Chrome extension for productivity.",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Chrome",
              "url": "https://cliro.tech",
              "author": {
                "@type": "Organization",
                "name": "Cliro"
              }
            })
          }}
        />
      </head>
      <body className="relative">
        <BackgroundElements />

        <div className="relative z-10">
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </div>

        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}