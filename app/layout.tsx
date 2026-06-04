import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "West Croydon Methodist Church",
  description: "A warm, welcoming Methodist church in West Croydon. All are welcome.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* If JavaScript is off, never hide content that waits for a scroll reveal */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
