import React, { FC } from 'react';
import { OrderStatusUIProps } from './type';
import { useSelector } from '../../../services/store';
import { selectUserOrders } from '../../../services/slices/usersOrderSlice';

export const OrderStatusUI: FC<OrderStatusUIProps> = ({ textStyle, text }) => {
  const orderStatuses = useSelector(selectUserOrders).find(
    (order) => order.status
  );

  if (orderStatuses?.status === 'pending') {
    text = 'Готовится';
  } else if (orderStatuses?.status === 'done') {
    text = 'Выполнен';
  } else if (orderStatuses?.status === 'created') {
    text = 'Создан';
  }
  return (
    <span
      className='text text_type_main-default pt-2'
      style={{ color: textStyle }}
    >
      {text}
    </span>
  );
};
