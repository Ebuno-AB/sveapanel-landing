import { createTheme } from "@mui/material/styles";

/**
 * Shared MUI theme — uses the same values as src/styles/theme.css.
 * Wrap the app root (or individual pages) with:
 *   <ThemeProvider theme={muiTheme}>
 */
const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#00cca3",
      light: "#00e6b8",
      dark: "#00a882",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#111111",
      secondary: "#555555",
      disabled: "#888888",
    },
    background: {
      default: "#ffffff",
      paper: "#f7f7f7",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily:
      "Cereal, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    // Mirrors --text-* and --weight-* tokens in theme.css
    h1: { fontSize: "3.5rem", fontWeight: 900, lineHeight: 1.2 },
    h2: { fontSize: "3rem", fontWeight: 800, lineHeight: 1.2 },
    h3: { fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.2 },
    h4: { fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.2 },
    h5: { fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.2 },
    h6: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.2 },
    body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: "0.9rem", fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default muiTheme;
