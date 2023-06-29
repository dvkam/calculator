import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import NodeMeJss from "@nodeme/jss-react";

NodeMeJss.init({
  palette: {
    primary: "#246cb5",
    secondary: "#2c689c",
    tertiary: "#333333",
    danger: "#b10711",
    success: "#559554",
    warning: "#e8db05",
    default: "#d9d9d9",
    body: "#ececec",
    grey: "#7d7d7d",
    black: "#3e3e3e",
    lightGrey: "#ececec",
    background: "#ececec",
    formBackground: "rgba(224, 224, 224, 0.6)",
    formBackgroundActive: "rgba(224, 224, 224, 1)",
  },
});

NodeMeJss.setDefinitions({
  link_button: {
    border: "none",
    outline: "none",
    padding: "0px",
    cursor: "pointer",
    backgroundColor: "unset",
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
