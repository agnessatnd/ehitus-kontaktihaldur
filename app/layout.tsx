import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import SidebarProviderClient from "@/components/sidebar-provider-client"
import TeamProviderClient from "@/components/team-provider-client"
import TeamUrlSyncClient from "@/components/team-url-sync-client"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TeamProviderClient>
            <Suspense>
              <TeamUrlSyncClient />
            </Suspense>
            <Suspense>
              <SidebarProviderClient>
                <div className="flex min-h-screen w-full">
                  <aside className="fixed inset-y-0 left-0 z-[100] h-full w-[200px] border-border bg-background">
                    <AppSidebar />
                  </aside>

                  <main className="flex-1 ml-64 p-8 transition-all duration-300">
                    {children}
                  </main>
                </div>
              </SidebarProviderClient>
            </Suspense>

            <Toaster
              position="top-right"
              richColors
              expand
              closeButton
              toastOptions={{
                style: {
                  fontSize: "16px",
                  padding: "14px 18px",
                  borderRadius: "10px",
                },
              }}
            />
          </TeamProviderClient>
        </ThemeProvider>
      </body>
    </html>
  )
}