import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen";
import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "@/lib/themes";
import { ToastProvider } from "@/ui/toast";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultViewTransition: true,
  defaultNotFoundComponent: () => <p>Not found {":("}</p>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (!rootElement) {
  throw new Error("Could not find root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastProvider />
    </ThemeProvider>
  </StrictMode>,
);
