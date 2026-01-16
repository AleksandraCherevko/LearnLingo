import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App";
import "modern-normalize";
import { ThemeProvider } from "./theme/ThemeProvider";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
);
