import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorBurger
} from '../../services/slices/burgerCunstructorSlice';
import {
  clearOrder,
  fetchOrderBurgerApi,
  selectOrder,
  selectOrderIsLoading
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../services/slices/authSlice';

export const BurgerConstructor: FC = () => {
  const items = useSelector(selectConstructorBurger).constructorItems;
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectUserData).name;

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    const { bun, ingredients } = items;
    if (!bun) {
      alert('Сначала соберите свой вкуснейший бургер!');
      return;
    }

    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(fetchOrderBurgerApi(order));
  };

  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (items.bun ? items.bun.price * 2 : 0) +
      items.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
    [items]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={items}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
