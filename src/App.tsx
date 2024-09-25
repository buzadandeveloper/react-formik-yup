import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";
import { Auth } from "./components/Auth/Auth";
function App() {
  const theme = {
    colors: {
      primary: "#66BB69",
      black: "#263238",
      d_grey: "#4D4D4D",
      grey: "#717171",
      l_grey: "#89939E",
      white: "#FFFFFF",
      shade: "#28CB8B",
      silver: "#F5F7FA",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
        <Auth />
    </ThemeProvider>
  );
}

export default App;
