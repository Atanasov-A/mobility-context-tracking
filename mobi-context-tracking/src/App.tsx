import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { AppBarWithMainLayout } from "./components/layout/AppBarWithMainLayout";
import { theme } from "./components/theme/CustomTheme";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* <AppToolbar /> */}
          <AppBarWithMainLayout />
          {/* <Main /> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
