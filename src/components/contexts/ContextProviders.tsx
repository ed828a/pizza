import React, { ReactNode } from "react";
import { ThemeContextProvider } from "./ThemeContextProvider";
import { NextAuthSessionProvider } from "./AuthContextProvider";
import CartContextProvider from "./CartContextProvider";

type Props = {
  children: ReactNode;
};

const ContextProviders = ({ children }: Props) => {
  return (
    <ThemeContextProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextAuthSessionProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </NextAuthSessionProvider>
    </ThemeContextProvider>
  );
};

export default ContextProviders;
