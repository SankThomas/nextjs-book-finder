import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Finder App using NextJs 14, The NYTimes API and TailwindCSS",
  description:
    "Book Finder App using NextJs 14, The NYTimes API and TailwindCSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
