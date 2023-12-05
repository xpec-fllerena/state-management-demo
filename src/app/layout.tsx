import { Inter } from "next/font/google";
import "./globals.css";
import Multiclient from "@@_components/Multiclient";
import { NAME_CLIENT } from "@@_constants/env_costants";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no"
      />
      <meta name="color-scheme" content="light" />
      <title>DEMO</title>
      <body className={inter.className}>
        <Multiclient path_override="components/Layout" client_prop={NAME_CLIENT} has_children>
          {children}
        </Multiclient>
      </body>
    </html>
  );
}
