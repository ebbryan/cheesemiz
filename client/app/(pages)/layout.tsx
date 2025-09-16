import type { Metadata } from "next";
import { B612, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/(shared)/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/user.context";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import ProgressBar from "@/components/ProgressBar";

const b612 = B612({
  variable: "--font-b612",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cheesemiz",
  description: "Open Source ChatApp",
};

type UserDataTypeFromJWT = Omit<JwtPayload, "exp" | "iat">;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user: UserDataTypeFromJWT | null = null;

  if (token) {
    try {
      user = jwtDecode(token) as UserDataTypeFromJWT;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <html lang="en">
      <body className={`${b612.variable} ${inter.variable} antialiased`}>
        <UserProvider>
          <ProgressBar>
            <Navigation me={user?.data}>{children}</Navigation>
            <Toaster />
          </ProgressBar>
        </UserProvider>
      </body>
    </html>
  );
}
