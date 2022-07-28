import { Routes, Route } from 'react-router-dom';

import { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useRefreshUserMutation,
  useLazyGetUserDataQuery,
} from 'redux/kapustaAPI';
import { getSid, getIsLoggedIn } from 'redux/selectors';
import { setUser, setWidth } from 'redux/reducer';
import { ToastContainer } from 'react-toastify';
import Test from './test/test';
import PrivateRoute from './Routs/PrivateRoute';
import PublicRoute from './Routs/PublicRoute';
// import ActionModal from './ActionModal';
import s from './App.module.css';

const Header = lazy(() => import('./Header' /* webpackChunkName: "header" */));

const AuthorizationPage = lazy(() =>
  import('pages/AuthorizationPage' /* webpackChunkName: "authorization" */)
);
const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "home" */)
);
const ReportPage = lazy(() =>
  import('pages/ReportPage' /* webpackChunkName: "report" */)
);

export const App = () => {
  const dispatch = useDispatch();
  const [refreshUser] = useRefreshUserMutation();
  const [getUserData] = useLazyGetUserDataQuery();
  const sid = useSelector(getSid);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      dispatch(setWidth({ width: 'mobile' }));
    }
    if (window.innerWidth > 768) {
      dispatch(setWidth({ width: 'tablet' }));
    }

    if (sid && !isLoggedIn) {
      refreshUser(sid)
        .unwrap()
        .then(data => {
          dispatch(
            setUser({
              token: data.newAccessToken,
              refreshToken: data.newRefreshToken,
              sid: data.newSid,
            })
          );
        })
        .then(() =>
          getUserData()
            .unwrap()
            .then(data =>
              dispatch(
                setUser({
                  email: data.email,
                  balance: data.balance,
                })
              )
            )
        );
      return;
    }
  }, [dispatch, getUserData, isLoggedIn, refreshUser, sid]);

  return (
    <div>
      <Suspense fallback={<div>...Loading</div>}>
        {/* <ActionModal/> */}
        <Header />
        <Routes>
          <Route
            path="/authorization"
            element={
              <PublicRoute>
                <AuthorizationPage />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <div className={s.back}>
                  <HomePage />
                </div>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <div className={s.back}>
                  <ReportPage />
                </div>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="*"
            element={
              <PublicRoute>
                <AuthorizationPage />
              </PublicRoute>
            }
          ></Route>
        </Routes>
        <Test />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};