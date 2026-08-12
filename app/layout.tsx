import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_TC({ variable: "--font-noto", subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vue.com.tw"),
  title: "VUE 臻域國際不動產",
  description: "以極致眼光，定義全球置產新標準。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "VUE 臻域國際不動產",
    description: "極致眼光，專業護航。",
    images: [{ url: "/og.png", width: 1536, height: 910, alt: "VUE 臻域國際不動產" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={sans.variable}>{children}</body></html>;
}
