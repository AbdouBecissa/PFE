import './App.css'
import AuthPanel from './components/AuthPanel'
import LeftPanel from './components/LeftPanel'
import LanguageSwitcher from './components/LanguageSwitcher'

export default function App() {
  return (
    <div className="page-wrapper">
      <div className="lang-switcher-wrapper">
        <LanguageSwitcher />
      </div>
      <div className="auth-card">
        <LeftPanel />
        <AuthPanel />
      </div>
    </div>
  )
}