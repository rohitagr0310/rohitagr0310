import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/Layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Collegology",
  description:
    "A platform for college students to connect with Consultants To get help in their College admissions",
  icons: {
    icon: "/images/collegologyy-logo.png", // For light mode
    shortcut: "/images/collegologyy-logo.png",
    apple: "/images/collegologyy-logo.png" // Apple touch icon (optional)
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
