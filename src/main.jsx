import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { getRoutes } from './router/AppRoutes'
import { RouterProvider } from 'react-router-dom'
import { AppTheme } from './theme'
import { Provider } from 'react-redux'
import { store } from './store'

const router = getRoutes()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store}>
      <AppTheme>
        <RouterProvider router={router} />
      </AppTheme>
    </Provider>
  </React.StrictMode>,
)
