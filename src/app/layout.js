import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./Redux/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Countries around the world",
  description: "Developped by TomRam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
