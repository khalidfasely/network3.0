import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import './index.css'
import { getUser } from './actions/getUser'
import { login } from './reducers/auth'
import { store } from './store/configureStore'
import { Provider } from 'react-redux'

getUser()
.then((res: any) => {
  if (res[1]) {
    return
  }

  store.dispatch(login(res[0]));
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)