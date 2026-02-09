import "./globals.css";
import Header from "./sections/header";
import Footer from "./sections/footer";
import { BackgroundElements } from "./ui/BackgroundElements";

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