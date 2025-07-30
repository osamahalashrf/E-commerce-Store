import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Css/components/form.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext.jsx";
import WindowContext from "./Context/WindowContext.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import CartChangerContext from "./Context/CartChangerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangerContext>
          <Router>
            <App />
          </Router>
        </CartChangerContext>
      </MenuContext>
    </WindowContext>
  </StrictMode>
);
