import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import * as bootstrap from 'bootstrap'

import { store } from './redux/store'
import { App } from './App.jsx'
import './index.scss'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
