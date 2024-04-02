import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectUserData
} from '../../services/slices/authSlice';
import { Navigate, useLocation } from 'react-router';
import { ReactElement } from 'react';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps): ReactElement => {
  const isAuthChecked = useSelector((state) => state.auth.isAuthenticated);
  const loginRequested = useSelector((state) => state.auth.loginUserRequest);
  const user = useSelector((state) => state.auth.data.name);
  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthChecked && loginRequested) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/profile' state={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
