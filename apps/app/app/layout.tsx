import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import "./globals.css"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import ogcool from "ogcool"
import { Toaster } from "sonner"

const ogImage = ogcool("OGCOOL", {
  modifications: [
    {
      name: "Text",
      text: "Extract Anything",
    },
    {
      name: "Description",
      text: "Open Source AI-Powered Extraction for Images, PDFs, and More",
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://extract-anything.ai"),
  title: "Extract Anything | Open Source AI-Powered Extraction",
  description: "Open Source AI-Powered Extraction for Images, PDFs, and More",
  openGraph: {
    images: [ogImage],
    siteName: "Extract Anything",
    locale: "en_US",
    type: "website",
    url: "https://extract-anything.ai",
    title: "Extract Anything | Open Source AI-Powered Extraction",
    description: "Open Source AI-Powered Extraction for Images, PDFs, and More",
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract Anything | Open Source AI-Powered Extraction",
    description: "Open Source AI-Powered Extraction for Images, PDFs, and More",
    images: [ogImage],
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const preferredRegion = ["fra1", "sfo1", "iad1"]
export const maxDuration = 60

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.className}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <Toaster position="top-center" richColors />
        <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-sky-100">
          <div className="mx-auto min-h-screen w-full max-w-screen-2xl p-4 pt-20">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
