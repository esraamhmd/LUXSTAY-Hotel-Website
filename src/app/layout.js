import { Jost, Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "LuxStay - The Best Hotel Deals in the World",
  description:
    "LuxStay is a boutique hotel booking experience: browse luxury rooms, on-site amenities, and reserve your stay in a few clicks.",
  icons: {
    icon: { url: "/favicon.ico", sizes: "any" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}