import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestalt Technologies (Private) Limited",
  description: "Human-centric workflows and immersive gaming ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="humanistic"
          enableSystem
          themes={['light', 'dark', 'corporate', 'dynamic', 'holistic', 'secure', 'humanistic']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}