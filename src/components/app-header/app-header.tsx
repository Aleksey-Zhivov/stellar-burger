import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectUserData
} from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserData).name;

  return <AppHeaderUI userName={userName} />;
};
