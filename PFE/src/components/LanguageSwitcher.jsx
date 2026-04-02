import { useState } from "react";
import { useLang } from "../LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "fr", label: t.lang_french },
    { code: "en", label: t.lang_english },
    { code: "ar", label: t.lang_arabic },
  ];

  const current = languages.find((l) => l.code === lang);

  return (
    <div className="lang-switcher">
      <button className="lang-btn" onClick={() => setOpen((p) => !p)}>
        <GlobeIcon />
        <span>{current.label}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.filter((l) => l.code !== lang).map((l) => (
            <button
              key={l.code}
              className="lang-option"
              onClick={() => { setLang(l.code); setOpen(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}