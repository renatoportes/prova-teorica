import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter >
  </React.StrictMode>,
)
