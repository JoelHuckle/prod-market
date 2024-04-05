import "../globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "prodmarket",
  description: "a marketplace to collaborate with other producers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-inter relative">
          <Header style="sticky" />
          <main className="relative overflow-hidden">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
