import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AllAccounts from './components/users/AllAccounts.tsx'
import ChatRoom from './components/chat/ChatRoom.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />    
  </React.StrictMode>
)
