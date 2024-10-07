import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import ByCategoriesSection from "@/components/features/articles-by-category/ByCategoriesSection";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Newws!",
    template: "%s | Newws!",
  },
  description:
    "Read updated news here in Newws, and you're ready to conquer the world!",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-dark`}
      >
        <Navbar />
        <div className="mx-auto max-w-screen-lg md:px-5">
          <div className="flex min-h-screen flex-col">
            <div className="flex flex-col gap-5 md:gap-0 md:flex-row mb-5 mt-1 md:mt-2">
              <div className="w-full md:w-2/3">{children}</div>
              <div className="md:ms-2 lg:ms-4 xl:ms-5 w-full md:w-1/3 p-3 md:p-3">
                <ByCategoriesSection />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
