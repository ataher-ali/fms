import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Auth/AuthContext.jsx'
import PrivateRoute from './Auth/PrivateRoute.jsx'

createRoot(document.getElementById('root')).render(


  

  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
