import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import App from "./App";

export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

import ServicePage from "./components/ServicePage";
import { servicePages } from "./scripts/service-content.mjs";
export function renderServicePages() { return servicePages.map(page => ({ ...page, html: renderToStaticMarkup(<ServicePage page={page} />) })); }
