import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: "AssignmentHub - Colorful Assignment Management",
  description:
    "A vibrant, interactive platform where students can submit assignments and teachers can provide feedback, all in one delightful space.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  )
}
