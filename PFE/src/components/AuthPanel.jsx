import { useState } from "react";
import "./AuthPanel.css";
import { useLang } from "../LanguageContext";

function validate(name, value, t) {
  switch (name) {
    case "identifier": {
      if (!value) return t.identifier_required;
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isValidPhone = /^\+?[0-9\s-]{7,15}$/.test(value);
      if (!isValidEmail && !isValidPhone) return t.identifier_invalid;
      return "";
    }
    case "password":
      if (!value) return t.password_required;
      if (value.length < 6) return t.password_short;
      return "";
    default:
      return "";
  }
}

export default function AuthPanel() {
  const { t } = useLang();

  const [login, setLogin] = useState({ identifier: "", password: "" });
  const [loginErr, setLoginErr] = useState({});
  const [loginTouched, setLoginTouched] = useState({});

  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLogin((p) => ({ ...p, [name]: value }));
    if (loginTouched[name])
      setLoginErr((p) => ({
        ...p,
        [name]: validate(name, value, t),
      }));
  }

  function handleLoginBlur(e) {
    const { name, value } = e.target;
    setLoginTouched((p) => ({ ...p, [name]: true }));
    setLoginErr((p) => ({ ...p, [name]: validate(name, value, t) }));
  }

  function handleLoginSubmit() {
    const fields = ["identifier", "password"];
    const touched = Object.fromEntries(fields.map((f) => [f, true]));
    const errors = Object.fromEntries(
      fields.map((f) => [f, validate(f, login[f], t)]),
    );
    setLoginTouched(touched);
    setLoginErr(errors);
    if (Object.values(errors).every((e) => !e)) alert("Connexion réussie !");
  }

  return (
    <div className="auth-panel">
      <div className="auth-form-container">
        <div className="auth-form-inner">
          <div className="auth-forms-body">
            <div className="auth-form auth-form--visible">
              <Field label={t.identifier_label} error={loginErr.identifier}>
                <input
                  name="identifier"
                  type="text"
                  className={`field-input ${loginTouched.identifier ? (loginErr.identifier ? "input-error" : "input-ok") : ""}`}
                  placeholder={t.identifier_placeholder}
                  value={login.identifier}
                  onChange={handleLoginChange}
                  onBlur={handleLoginBlur}
                />
              </Field>

              <Field label={t.password} error={loginErr.password}>
                <div className="input-icon-wrap">
                  <input
                    name="password"
                    type={showLoginPass ? "text" : "password"}
                    className={`field-input ${loginTouched.password ? (loginErr.password ? "input-error" : "input-ok") : ""}`}
                    placeholder="••••••••••"
                    value={login.password}
                    onChange={handleLoginChange}
                    onBlur={handleLoginBlur}
                  />
                  <button
                    className="eye-btn"
                    onClick={() => setShowLoginPass((p) => !p)}
                  >
                    {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <div className="login-meta">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((v) => !v)}
                  />
                  <span>{t.remember_me}</span>
                </label>
                <a href="#" className="forgot-link">
                  {t.forgot_password}
                </a>
              </div>

              <button className="btn-primary" onClick={handleLoginSubmit}>
                {t.login_btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>
      {children}
      <div className="field-error-slot">
        {error && (
          <span className="field-error">
            <WarningIcon /> {error}
          </span>
        )}
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ flexShrink: 0, marginTop: "1px" }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}