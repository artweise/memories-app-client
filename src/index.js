import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/system";

import App from "./App";
import { AuthProviderWrapper } from "./context/auth.context";
import { GlobalStyle, globalTheme } from "./utilities/globalStyles";
const root = ReactDOM.createRoot(document.getElementById("root"));

// Create a client
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <AuthProviderWrapper>
          <ThemeProvider theme={globalTheme}>
            <App />
          </ThemeProvider>
        </AuthProviderWrapper>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
