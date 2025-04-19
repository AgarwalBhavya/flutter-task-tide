
import React from "react";

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};

export const useTheme = () => {
  return {
    isDarkMode: false,
    toggleTheme: () => {
      console.log("Theme toggled");
    },
  };
};
