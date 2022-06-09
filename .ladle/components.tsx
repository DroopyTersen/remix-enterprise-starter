import type { GlobalProvider } from "@ladle/react";
import "bootstrap/dist/js/bootstrap.bundle";
import { MemoryRouter } from "react-router-dom";
import "../styles/_entry.scss";
export const Provider: GlobalProvider = ({ children, globalState }) => (
  <MemoryRouter>
    <h1>Theme: {globalState.theme}</h1>
    {children}
  </MemoryRouter>
);
