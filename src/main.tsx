import React from "react";
import ReactDOM from "react-dom/client";
import { VueSite } from "../app/vue-site";
import PrivacyPolicy from "../app/legal/privacy-policy/page";
import Terms from "../app/legal/terms-of-service/page";
import License from "../app/legal/real-estate-brokerage-license/page";
import { AdminApp } from "./admin";
import "../app/globals.css";

function App() {
  const route = window.location.hash.replace(/^#/, "");
  if (route === "/admin") return <AdminApp />;
  if (route === "/legal/privacy-policy") return <PrivacyPolicy />;
  if (route === "/legal/terms-of-service") return <Terms />;
  if (route === "/legal/real-estate-brokerage-license") return <License />;
  return <VueSite />;
}

window.addEventListener("hashchange", () => window.location.reload());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
