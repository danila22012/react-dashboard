import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import darkModeColors from "./darkModeColors";
import lightModeColors from "./lightModeColors";

// color designed tokens
export const tokens = (mode) => ({
  ...(mode === 'dark' ? darkModeColors : lightModeColors)
})

// MUI theme settings

export const themeSettings = (mode) => {
  const colors = tokens(mode)

  return ({
    palette: {
      mode: mode,
      ...(mode === 'dark' ? {
        // dark mode color settings
        primary: {
          main: colors.primary[500]
        },
        secondary: {
          main: colors.greenAccent[500]
        },
        neutral: {
          dark: colors.grey[700],
          main: colors.grey[500],
          light: colors.grey[100],
        },
        background: {
          default: colors.primary[100]
        }
      } : {
        // light mode color settings
        primary: {
          main: colors.primary[100]
        },
        secondary: {
          main: colors.greenAccent[500]
        },
        neutral: {
          dark: colors.grey[700],
          main: colors.grey[500],
          light: colors.grey[100],
        },
        background: {
          default: '#fcfcfc'
        }
      })
    },
    typography: ["Source Sans Pro", "sans-serif"].join(','),
    fontSize: 12,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
  })
}

export const ColorModeContext = createContext({
  toggleColorMode: () => { },
})

export const useMode = () => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode(prev => prev === 'light' ? 'dark' : 'light'),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return [theme, colorMode]
}