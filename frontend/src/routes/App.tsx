import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import NotFound from '../pages/NotFound';

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route
          path='/'
          element={<h1>Home</h1>}
        />
        <Route
          path='/login'
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path='/register'
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
