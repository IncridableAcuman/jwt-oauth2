import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import { ProfileProvider } from "./provider/ProfileProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>,
);
