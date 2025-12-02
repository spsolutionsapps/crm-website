import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import ConditionalLayout from "@/components/Layout/ConditionalLayout";
import ReCaptchaProvider from "@/components/Common/ReCaptchaProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const isProd = process.env.NODE_ENV === "production";
const basePath = ""; // Servir desde la raíz del dominio

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: `${basePath}/images/favicon/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${basePath}/images/favicon/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/images/favicon/favicon.ico` },
    ],
    apple: [
      { url: `${basePath}/images/favicon/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: `${basePath}/images/favicon/site.webmanifest` },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <NextTopLoader />
      <ReCaptchaProvider>
      <AuthDialogProvider>
      <SessionProviderComp session={null}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
        </SessionProviderComp>
        </AuthDialogProvider>
      </ReCaptchaProvider>
      </body>
    </html>
  );
}
