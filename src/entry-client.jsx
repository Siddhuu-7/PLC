import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter,Router } from 'react-router-dom'
import {InitialDataProvider} from "./context/InitialDataContext"
const initialData = window.__INITIAL_DATA__;
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
 <InitialDataProvider value={initialData}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </InitialDataProvider>
   
  </StrictMode>,
)
