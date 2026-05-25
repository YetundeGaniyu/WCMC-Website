import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WCMC — West Croydon Methodist Church",
  description: "A warm, welcoming Methodist church in West Croydon. All are welcome.",
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
