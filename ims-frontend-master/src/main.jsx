import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from './components/AppProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <App />
    </AppProvider>
  </StrictMode>,
)
