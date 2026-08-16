import localFont from "next/font/local";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { ThemeProvider } from "@/providers/theme-provider";

const dinNextRounded = localFont({
  src: "../../public/fonts/DIN_Next_Rounded.ttf",
  variable: "--font-din",
});

const featherBold = localFont({
  src: "../../public/fonts/Feather_Bold.ttf",
  variable: "--font-feather",
});

export const metadata: Metadata = {
  title: "Duolingo",
  description: "Duolingo Clone",
};

const clerkAppearance = {
  elements: {
    modalBackdrop: {
      alignItems: "center",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dinNextRounded.variable} ${featherBold.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ClerkProvider appearance={clerkAppearance}>
            <Toaster />
            <ExitModal />
            <HeartsModal />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
