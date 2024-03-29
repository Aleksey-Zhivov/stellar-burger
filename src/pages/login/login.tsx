import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearErrorMessage,
  fetchLoginUser,
  selectError
} from '../../services/slices/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
