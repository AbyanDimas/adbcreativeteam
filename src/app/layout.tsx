import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import {Navbar, Layout } from "@/components";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADB Creative Team SMKN 1 Adiwerna",
  description:
    "Selamat datang di halaman resmi ADB Creative Team SMKN 1 Adiwerna. Kami adalah tim kreatif yang bergerak di bidang desain, multimedia, dan pengembangan digital sekolah.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={roboto.className}>
          <Navbar />
        <Layout>
          {children}
          {/* <FixedPlugin /> */}
        </Layout>
      </body>
    </html>
  );
}
