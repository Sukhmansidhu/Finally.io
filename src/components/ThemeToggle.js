import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="btn btn-outline-secondary ms-3"
      onClick={toggleTheme}
      onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
      aria-label={`Toggle theme to ${theme === "light" ? "dark" : "light"}`}
      role="switch"
      aria-checked={theme === "dark"}
    >
      {theme === "light" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}