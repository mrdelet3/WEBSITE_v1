import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { CartProvider } from '@/context/CartContext'
import { ThemeProvider } from '@/context/ThemeContext'

// Use BrowserRouter for normal web
const Router = BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <CartProvider>
        <HelmetProvider>
          <Router>
            <App />
          </Router>
        </HelmetProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
