import { useSelector } from '../../services/store';
import { selectIsAuth, selectUserData } from '../../services/slices/authSlice';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import { ReactElement } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuth);
  const user = useSelector(selectUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
