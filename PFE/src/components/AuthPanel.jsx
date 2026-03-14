import { useState } from "react";
import "./AuthPanel.css";

function validate(name, value, signupPassword) {
  switch (name) {
    case "email":
      if (!value) return "L'email est requis.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email invalide. Ex: nom@gmail.com";
      return "";
    case "phone":
      if (!value) return "Le numéro est requis.";
      if (!/^\+?[0-9\s-]{7,15}$/.test(value)) return "Numéro invalide. Chiffres uniquement.";
      return "";
    case "password":
      if (!value) return "Le mot de passe est requis.";
      if (value.length < 6) return "Minimum 6 caractères.";
      return "";
    case "confirm":
      if (!value) return "Veuillez confirmer le mot de passe.";
      if (value !== signupPassword) return "Les mots de passe ne correspondent pas.";
      return "";
    default:
      return "";
  }
}

export default function AuthPanel() {
  const [tab, setTab] = useState("login");

  const [login, setLogin] = useState({ email: "", password: "" });
  const [loginErr, setLoginErr] = useState({});
  const [loginTouched, setLoginTouched] = useState({});

  const [signup, setSignup] = useState({ email: "", phone: "", password: "", confirm: "" });
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
    if (loginTouched[name]) setLoginErr((p) => ({ ...p, [name]: validate(name, value) }));
  }

  function handleLoginBlur(e) {
    const { name, value } = e.target;
    setLoginTouched((p) => ({ ...p, [name]: true }));
    setLoginErr((p) => ({ ...p, [name]: validate(name, value) }));
  }

  function handleLoginSubmit() {
    const fields = ["email", "password"];
    const touched = Object.fromEntries(fields.map((f) => [f, true]));
    const errors = Object.fromEntries(fields.map((f) => [f, validate(f, login[f])]));
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
        [name]: validate(name, value, name === "confirm" ? signup.password : undefined),
      }));
    }
  }

  function handleSignupBlur(e) {
    const { name, value } = e.target;
    setSignupTouched((p) => ({ ...p, [name]: true }));
    setSignupErr((p) => ({
      ...p,
      [name]: validate(name, value, signup.password),
    }));
  }

  function handleSignupSubmit() {
    const fields = ["email", "phone", "password", "confirm"];
    const touched = Object.fromEntries(fields.map((f) => [f, true]));
    const errors = Object.fromEntries(fields.map((f) => [f, validate(f, signup[f], signup.password)]));
    setSignupTouched(touched);
    setSignupErr(errors);
    if (Object.values(errors).every((e) => !e) && acceptTerms) alert("Compte créé !");
  }

  const signupValid =
    !validate("email", signup.email, signup.password) &&
    !validate("phone", signup.phone, signup.password) &&
    !validate("password", signup.password, signup.password) &&
    !validate("confirm", signup.confirm, signup.password) &&
    acceptTerms;

  return (
    <div className="auth-panel">
      <div className="auth-form-container">
        <div className="auth-form-inner">

          <div className="auth-tabs">
            <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>
              Connexion
            </button>
            <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>
              Créer un compte
            </button>
          </div>

          <div className="auth-forms-body">

            <div className={`auth-form ${tab === "login" ? "auth-form--visible" : "auth-form--hidden"}`}>
              <Field label="Email" error={loginErr.email}>
                <input
                  name="email"
                  type="email"
                  className={`field-input ${loginTouched.email ? (loginErr.email ? "input-error" : "input-ok") : ""}`}
                  placeholder="youremail@gmail.com"
                  value={login.email}
                  onChange={handleLoginChange}
                  onBlur={handleLoginBlur}
                />
              </Field>

              <Field label="Mot de passe" error={loginErr.password}>
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
                  <button className="eye-btn" onClick={() => setShowLoginPass((p) => !p)}>
                    {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <div className="login-meta">
                <label className="checkbox-label">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((v) => !v)} />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#" className="forgot-link">Mot de passe oublié ?</a>
              </div>

              <button className="btn-primary" onClick={handleLoginSubmit}>Se connecter</button>

              <div className="divider"><span>OU</span></div>

              <button className="btn-google"><GoogleIcon />Continuer avec Google</button>

              <p className="switch-hint">
                Pas encore de compte ?{" "}
                <button className="link-btn" onClick={() => setTab("signup")}>Créer un compte</button>
              </p>
            </div>

            <div className={`auth-form ${tab === "signup" ? "auth-form--visible" : "auth-form--hidden"}`}>
              <Field label="Email" error={signupErr.email}>
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

              <Field label="Numéro de téléphone" error={signupErr.phone}>
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

              <Field label="Mot de passe" error={signupErr.password}>
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
                  <button className="eye-btn" onClick={() => setShowPass((p) => !p)}>
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <Field label="Confirmer mot de passe" error={signupErr.confirm}>
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
                  <button className="eye-btn" onClick={() => setShowConfirm((p) => !p)}>
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <label className="checkbox-label terms">
                <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms((v) => !v)} />
                <span>J'accepte les conditions d'utilisation</span>
              </label>

              <button className="btn-primary" disabled={!signupValid} onClick={handleSignupSubmit}>
                Créer un compte
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "1px" }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}