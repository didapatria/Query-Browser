import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const doc = document.getElementById("root");
const root = createRoot(doc!);
root.render(<App />);
