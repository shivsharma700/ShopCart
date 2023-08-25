import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <CookiesProvider defaultSetCookies={{path: '/'}}>
        <App />
     </CookiesProvider>
  </BrowserRouter>,
)
