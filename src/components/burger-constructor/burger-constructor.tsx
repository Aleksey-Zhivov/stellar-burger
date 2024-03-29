import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
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

export const BurgerConstructor: FC = () => {
  const items = useSelector(selectConstructorBurger).constructorItems;
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (items.bun) {
      const order: string[] = [
        items.bun!._id,
        ...items.ingredients.map((ingredient) => ingredient.id)
      ];
      dispatch(fetchOrderBurgerApi(order));
    } else {
      alert('Сначала соберите свой вкуснейший бургер!');
    }
  };

  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (items.bun ? items.bun.price * 2 : 0) +
      items.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
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
