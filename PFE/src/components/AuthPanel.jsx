import { useState } from "react";
import "./AuthPanel.css";
import { useLang } from "../LanguageContext";

function validate(name, value, signupPassword, t) {
  switch (name) {
    case "identifier": {
      if (!value) return t.identifier_required;
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isValidPhone = /^\+?[0-9\s-]{7,15}$/.test(value);
      if (!isValidEmail && !isValidPhone) return t.identifier_invalid;
      return "";
    }
    case "email":
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return t.email_invalid;
      return "";
    case "phone":
      if (!value) return t.phone_required;
      if (!/^\+?[0-9\s-]{10,15}$/.test(value)) return t.phone_invalid;
      return "";
    case "password":
      if (!value) return t.password_required;
      if (value.length < 6) return t.password_short;
      return "";
    case "confirm":
      if (!value) return t.confirm_required;
      if (value !== signupPassword) return t.confirm_mismatch;
      return "";
    default:
      return "";
  }
}

export default function AuthPanel() {
  const { t } = useLang();
  const [tab, setTab] = useState("login");

  const [login, setLogin] = useState({ identifier: "", password: "" });
  const [loginErr, setLoginErr] = useState({});
  const [loginTouched, setLoginTouched] = useState({});

  const [signup, setSignup] = useState({
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [signupErr, setSignupErr] = useState({});
  const [signupTouched, setSignupTouched] = useState({});

  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLogin((p) => ({ ...p, [name]: value }));
    if (loginTouched[name])
      setLoginErr((p) => ({
        ...p,
        [name]: validate(name, value, undefined, t),
      }));
  }

  function handleLoginBlur(e) {
    const { name, value } = e.target;
    setLoginTouched((p) => ({ ...p, [name]: true }));
    setLoginErr((p) => ({ ...p, [name]: validate(name, value, undefined, t) }));
  }

  function handleLoginSubmit() {
    const fields = ["identifier", "password"];
    const touched = Object.fromEntries(fields.map((f) => [f, true]));
    const errors = Object.fromEntries(
      fields.map((f) => [f, validate(f, login[f], undefined, t)]),
    );
    setLoginTouched(touched);
    setLoginErr(errors);
    if (Object.values(errors).every((e) => !e)) alert("Connexion réussie !");
  }

  function handleSignupChange(e) {
    const { name, value } = e.target;
    setSignup((p) => ({ ...p, [name]: value }));
    if (signupTouched[name]) {
      setSignupErr((p) => ({
        ...p,
        [name]: validate(
          name,
          value,
          name === "confirm" ? signup.password : undefined,
          t,
        ),
      }));
    }
  }

  function handleSignupBlur(e) {
    const { name, value } = e.target;
    setSignupTouched((p) => ({ ...p, [name]: true }));
    setSignupErr((p) => ({
      ...p,
      [name]: validate(name, value, signup.password, t),
    }));
  }

  function handleSignupSubmit() {
    const fields = ["email", "phone", "password", "confirm"];
    const touched = Object.fromEntries(fields.map((f) => [f, true]));
    const errors = Object.fromEntries(
      fields.map((f) => [f, validate(f, signup[f], signup.password, t)]),
    );
    setSignupTouched(touched);
    setSignupErr(errors);
    if (Object.values(errors).every((e) => !e) && acceptTerms)
      alert("Compte créé !");
  }

  const signupValid =
    !validate("email", signup.email, signup.password, t) &&
    !validate("phone", signup.phone, signup.password, t) &&
    !validate("password", signup.password, signup.password, t) &&
    !validate("confirm", signup.confirm, signup.password, t) &&
    acceptTerms;

  return (
    <div className="auth-panel">
      <div className="auth-form-container">
        <div className="auth-form-inner">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === "login" ? "active" : ""}`}
              onClick={() => setTab("login")}
            >
              {t.login_tab}
            </button>
            <button
              className={`auth-tab ${tab === "signup" ? "active" : ""}`}
              onClick={() => setTab("signup")}
            >
              {t.register_tab}
            </button>
          </div>

          <div className="auth-forms-body">
            <div
              className={`auth-form ${tab === "login" ? "auth-form--visible" : "auth-form--hidden"}`}
            >
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
              <div className="divider">
                <span>{t.span}</span>
              </div>
              <button className="btn-google">
                <GoogleIcon />
                {t.google_btn}
              </button>
              <p className="switch-hint">
                {t.no_account}{" "}
                <button className="link-btn" onClick={() => setTab("signup")}>
                  {t.register_tab}
                </button>
              </p>
            </div>

            <div
              className={`auth-form ${tab === "signup" ? "auth-form--visible" : "auth-form--hidden"}`}
            >
              <Field label={t.email} error={signupErr.email}>
                <input
                  name="email"
                  type="email"
                  className={`field-input ${signupTouched.email ? (signupErr.email ? "input-error" : "input-ok") : ""}`}
                  placeholder="youremail@gmail.com"
                  value={signup.email}
                  onChange={handleSignupChange}
                  onBlur={handleSignupBlur}
                />
              </Field>

              <Field label={t.phone} error={signupErr.phone}>
                <input
                  name="phone"
                  type="tel"
                  className={`field-input ${signupTouched.phone ? (signupErr.phone ? "input-error" : "input-ok") : ""}`}
                  placeholder="••••••••••"
                  value={signup.phone}
                  onChange={handleSignupChange}
                  onBlur={handleSignupBlur}
                />
              </Field>

              <Field label={t.password} error={signupErr.password}>
                <div className="input-icon-wrap">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    className={`field-input ${signupTouched.password ? (signupErr.password ? "input-error" : "input-ok") : ""}`}
                    placeholder="••••••••••"
                    value={signup.password}
                    onChange={handleSignupChange}
                    onBlur={handleSignupBlur}
                  />
                  <button
                    className="eye-btn"
                    onClick={() => setShowPass((p) => !p)}
                  >
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <Field label={t.confirm_password} error={signupErr.confirm}>
                <div className="input-icon-wrap">
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    className={`field-input ${signupTouched.confirm ? (signupErr.confirm ? "input-error" : "input-ok") : ""}`}
                    placeholder="••••••••••"
                    value={signup.confirm}
                    onChange={handleSignupChange}
                    onBlur={handleSignupBlur}
                  />
                  <button
                    className="eye-btn"
                    onClick={() => setShowConfirm((p) => !p)}
                  >
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <label className="checkbox-label terms">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms((v) => !v)}
                />
                <span>{t.terms}</span>
              </label>

              <button
                className="btn-primary"
                disabled={!signupValid}
                onClick={handleSignupSubmit}
              >
                {t.register_btn}
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
