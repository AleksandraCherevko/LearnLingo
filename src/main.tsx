import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App";
import "modern-normalize";
import { ThemeProvider } from "./theme/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
