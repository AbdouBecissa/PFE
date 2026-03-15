import './App.css'
import AuthPanel from './components/AuthPanel'
import LeftPanel from './components/LeftPanel'

export default function App() {
  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <LeftPanel />
        <AuthPanel />
      </div>
    </div>
  )
}