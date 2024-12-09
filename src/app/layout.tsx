import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "src/utils/Providers";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ 
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "ToDo List",
  description: "Gerenciador de tarefas com API próprios usando Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` dark:bg-slate-900 dark:text-slate-50 ${interTight.variable} antialiased`}
      >
          <Provider>
            {children}
          </Provider>
      </body>
    </html>
  );
}
