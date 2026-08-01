import localFont from "next/font/local";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

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
    >
      <body className="font-sans antialiased">
        <ClerkProvider appearance={clerkAppearance}>
          <Toaster />
          <ExitModal/>
          <HeartsModal/>
          <PracticeModal/>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
