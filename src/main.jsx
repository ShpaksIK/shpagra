import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './main.css'
import store from './redux/store.js'
import AppContainer from './App.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>,
)
