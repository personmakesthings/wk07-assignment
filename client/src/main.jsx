// IMPORT STYLESHEETS
import "./index.css"

// IMPORT MODULES
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// IMPORT APP
import App from "./App.jsx"

// MOUNT APP ON ROOT
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
)