import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import AppProvider from "@/components/AppProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat GPT Amplified App",
  description: "An ambitious project to amplify ChatGPT!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}
