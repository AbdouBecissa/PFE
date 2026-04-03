import { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations.json";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  const t = Object.fromEntries(
    Object.entries(translations).map(([key, val]) => [key, val[lang]])
  );

  useEffect(() => {
    document.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}