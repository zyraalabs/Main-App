import { COOKIE_DOMAIN } from "./env";

export type Theme = "dark" | "light";

const COOKIE_NAME = "zyraa-theme";

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const match = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  return match === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme !== "light");
}

export function writeTheme(theme: Theme) {
  const domain = COOKIE_DOMAIN ? `;Domain=${COOKIE_DOMAIN}` : "";
  document.cookie = `${COOKIE_NAME}=${theme};path=/${domain};max-age=31536000;SameSite=Lax`;
}
