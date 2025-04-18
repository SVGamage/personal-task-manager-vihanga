import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import SideBar from "@/components/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Task Master",
  description: "Task Master is a task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#fbbd23",
        },
      }}
    >
      <html lang="en">
        <body className={"antialiased"}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                  <SignedIn>
                    <div className="hidden md:col-span-2 md:block">
                      <div className="sticky top-[5.5rem]">
                        <Card className="p-4">
                          <SideBar />
                        </Card>
                      </div>
                    </div>
                  </SignedIn>
                  {children}
                </div>
              </main>
            </div>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
