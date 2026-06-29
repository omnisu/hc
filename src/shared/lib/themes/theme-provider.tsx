import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { appThemeSchema, type AppTheme, type ResolvedAppTheme } from "./schemas";
import { useStoredState } from "../../hooks/use-stored-state";

type ThemeContextType = {
  theme: AppTheme;
  resolvedTheme: ResolvedAppTheme;
  setTheme: (theme: AppTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function subscribeToSystemTheme(cbq: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cbq);
  return () => {
    mq.removeEventListener("change", cbq);
  };
}

function readSystemTheme(): ResolvedAppTheme {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface Props {
  children: ReactNode;
}

export function ThemeProvider(props: Props) {
  const [theme, setTheme] = useStoredState({
    key: "app-theme",
    schema: appThemeSchema,
    initialValue: "system",
  });

  const systemTheme: ResolvedAppTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    readSystemTheme,
    () => "light",
  );

  const resolvedTheme: ResolvedAppTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        resolvedTheme: resolvedTheme,
        theme: theme,
        setTheme: setTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
