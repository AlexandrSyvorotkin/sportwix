import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./legacy/context/ThemeContext/ThemeContext.tsx";
import { Provider } from "react-redux";
import { LanguageProvider } from "./legacy/context/LanguageContext/LanguageContext.tsx";
import store from "./legacy/redux/store.ts";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
