import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearErrorMessage,
  fetchRegisterUser,
  selectError,
  selectIsAuthenticated
} from '../../services/slices/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ name, email, password }));
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
