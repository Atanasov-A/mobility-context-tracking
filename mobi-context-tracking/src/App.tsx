import { ThemeProvider, useTheme } from "@emotion/react";
import {createTheme} from "@mui/material";
import { AppToolbar } from "./components/layout/AppToolbar";
import { Main } from "./components/layout/Main";
import {theme} from "./components/theme/CustomTheme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppToolbar />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
