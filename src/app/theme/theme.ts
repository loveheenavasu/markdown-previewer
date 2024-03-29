import { extendTheme, ThemeConfig } from "@chakra-ui/react";

interface ThemeProps {
  colorMode: "light" | "dark";
}

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      500: "#3182ce",
    },
  },
  styles: {
    global: (props: ThemeProps) => ({
      body: {
        color: props.colorMode === "dark" ? "black" : "white",
        bg: props.colorMode === "dark" ? "#eeeeee" : "black",
      },
      "::selection": {
        background: props.colorMode === "dark" ? "#2f2f2f" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      h1: {
        fontSize: "30px",
        fontWeight: "600",
        color: props.colorMode === "dark" ? "black" : "white",
      },
      h2: {
        fontSize: "24px",
        fontWeight: "bold",
      },
      span: {
        fontWeight: "450",
      },
      ".splash-screen": {
        bg: props.colorMode === "dark" ? "white" : "#131313",
      },
      ".splash-screen__logo h2::before": {
        color: props.colorMode === "dark" ? "#606060" : "#8d8d8d"
      },
      ".hr-break": {
        bg: props.colorMode === "dark" ? "#9a9a9a" : "#eee",
      },
      ".toolbar": {
        bg: props.colorMode === "dark" ? "white" : "#b3b9bb",
        color: props.colorMode === "dark" ? "black" : "white",
      },
      ".editor-inner": {
        bg: props.colorMode === "dark" ? "white" : "#2f2f2f",
        color: props.colorMode === "dark" ? "black" : "white",
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-paragraph": {
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-heading-h1": {
        color: props.colorMode === "dark" ? "black" : "white",
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-heading-h2": {
        color: props.colorMode === "dark" ? "" : "white",
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-quote": {
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-list-ol": {
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-list-ul": {
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-listitem": {
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-text-code": {
        bg: props.colorMode === "dark" ? "rgb(240, 242, 245)" : "black",
        caretColor: props.colorMode === 'dark' ? 'black' : 'white'
      },
      ".editor-preview": {
        bg: props.colorMode === "dark" ? "white" : "#B0B0B0",
      },
      ".button": {
        bg: props.colorMode === "dark" ? "black" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      ".button:hover": {
        bg: props.colorMode === "dark" ? "black" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      ".demo-button:hover" : {
        color: props.colorMode === "dark" ? "white" : "white",
      }
    }),
  },
  components: {
    Text: {
      baseStyle: (props: ThemeProps) => ({
        color: props.colorMode === "dark" ? "#333" :  "white",
        fontFamily: "Ubuntu Mono, Monospace",
        fontWeight: "bold",
        sizes: {
          h2: {
            fontSize: "24px",
          },
        },
      }),
      Heading: {
        baseStyle: (props: ThemeProps) => ({
          color: props.colorMode === "dark" ? "black" : "white",
        }),
        sizes: {
          h2: {
            fontSize: "20px",
          },
        },
      },
    },
  },
});

export default theme;
