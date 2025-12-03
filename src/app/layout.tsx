import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  title: "Claude code Blog",
  description: "Claude Code modern design system with custom themes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="flex justify-between items-center p-4 bg-surface border-b border-border">
          <Link href="/" className="no-underline">
            <h1 className="text-3xl font-semibold m-0 text-foreground hover:text-primary transition-colors cursor-pointer">
              Claude Code
            </h1>
          </Link>
          <DarkModeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
