import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-inter relative">
          <main className="relative overflow-hidden">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
