import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Main.tsx loading...");
console.log("Root element:", document.getElementById("root"));

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, creating React root...");
  const root = createRoot(rootElement);
  console.log("Rendering App component...");
  root.render(<App />);
  console.log("App component rendered!");
}
