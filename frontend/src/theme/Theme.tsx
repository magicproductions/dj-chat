import { createTheme, PaletteMode, responsiveFontSizes } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
    };
  }

  interface ThemeOptions {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
    };
  }
}

export const createMuiTheme = (mode: PaletteMode) => {
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
      body1: {
        fontWeight: 500,
        letterSpacing: "-0.5px",
      },
      body2: {
        fontWeight: 500,
        fontSize: "15px",
        letterSpacing: "-0.5px",
      },
    },
    primaryAppBar: {
      height: 60,
    },
    primaryDraw: {
      width: 240,
      closed: 70,
    },
    secondaryDraw: {
      width: 240,
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: grey,
            divider: grey[300],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            primary: grey,
            divider: grey[600],
            background: {
              default: grey[900],
              paper: grey[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default createMuiTheme;
