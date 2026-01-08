import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { StaticRouter,Router } from 'react-router-dom'
import {InitialDataProvider} from "./context/InitialDataContext"

/**
 * @param {string} _url
 * @param {any} initialData
 */
export function render(_url,initialData) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={_url}>
 <InitialDataProvider data={initialData}>
          <App />
        </InitialDataProvider>   
           </StaticRouter>
    </StrictMode>,
  )
  return { html }
}
