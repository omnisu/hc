import { createContext, useContext } from "react";

type SidebarContextType = {
  expanded: boolean;
  setExpanded: (newExpanded: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within Sidebar");
  }
  return ctx;
}
