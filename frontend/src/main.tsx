import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import './index.css';
import { getUser } from './actions/user';
import { login } from './reducers/auth';
import { store } from './store/configureStore';
import { Provider } from 'react-redux';

getUser()
.then((res: any) => {
  store.dispatch(login(res.data));
})
.catch(er => {
  //handle errors
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)