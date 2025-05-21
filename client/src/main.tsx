import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import react-sf-symbols for Vision OS style icons
import "react-sf-symbols/dist/react-sf-symbols.css";

createRoot(document.getElementById("root")!).render(<App />);
