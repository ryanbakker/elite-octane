import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EliteOctane - Car Marketplace",
  description: "Buy n Sell website for car enthusasists of the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
