import type { Metadata } from "next";
import { Courier_Prime, DM_Sans, Newsreader, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const editorial = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Coron — AI turns your goal into a winning plan",
    template: "%s · Coron",
  },
  description:
    "Tell Coron what you want to achieve. It builds a smart, prioritized, perfectly-timed plan — visualized like nothing you've seen before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${grotesk.variable} ${spaceMono.variable} ${editorial.variable} ${courier.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
