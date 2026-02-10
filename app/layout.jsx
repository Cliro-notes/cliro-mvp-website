import "./globals.css";
import Header from "./sections/header";
import Footer from "./sections/footer";
import { BackgroundElements } from "./ui/BackgroundElements";

export const metadata = {
  title: 'Cliro',
  description: 'Cliro WebsiteCliro, an AI writing companion that boosts creativity when words don’t come easily.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        {/* Background Elements for entire site */}
        <BackgroundElements />

        {/* Main content */}
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
