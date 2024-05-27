import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { AppRoutes } from './router/AppRoutes'
import { AppTheme } from './theme'
import { Provider } from 'react-redux'
import { store } from './store'

/* const router = getRoutes() */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store}>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
    </Provider>
  </React.StrictMode>,
)
