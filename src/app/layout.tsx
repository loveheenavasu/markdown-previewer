"use client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import "./globals.css";
import theme from "./theme/theme";
import Seo from "./components/Seo";

const metadata = {
  title: "Lexical-markdown-editor",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Seo />
      </head>
      
      
      <body>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
