import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectUserData
} from '../../services/slices/authSlice';
import { Navigate, useLocation } from 'react-router';
import { ReactElement } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps): ReactElement => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!onlyUnAuth && !isAuthenticated) {
    //нужна авторизаия, пользователь НЕ авторизован
    return <Navigate replace to='/login' state={from} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    //НЕ нужна авторизация, пользователь авторизован
    return <Navigate replace to='/profile' state={from} />;
  }

  return children;
};
