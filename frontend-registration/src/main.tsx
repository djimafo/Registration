import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AllAccounts from './components/users/AllAccounts.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
    <AllAccounts></AllAccounts>
  </React.StrictMode>,
)
