import { useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../services/slices/authSlice';
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
  const from = { pathname: '/' };

  if (!onlyUnAuth && !isAuthenticated) {
    //нужна авторизаия, пользователь НЕ авторизован
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    //НЕ нужна авторизация, пользователь авторизован
    return <Navigate replace to='/profile' state={from} />;
  }

  //кажется, есть третий путь, но пока не понятно какой..

  return children;
};
