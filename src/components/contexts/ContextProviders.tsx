import React, { ReactNode } from "react";
import { ThemeContextProvider } from "./ThemeContextProvider";
import { NextAuthSessionProvider } from "./AuthContextProvider";

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
      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
    </ThemeContextProvider>
  );
};

export default ContextProviders;
