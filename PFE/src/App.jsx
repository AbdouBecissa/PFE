import './App.css'
import AuthPanel from './components/AuthPanel'

export default function App() {
  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <div style={{
          flex: 1,
          background: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#aaa',
          fontSize: '14px',
          borderRight: '1px solid #eee'
        }}>
          Left panel (coming soon)
        </div>
        <AuthPanel />
      </div>
    </div>
  )
}