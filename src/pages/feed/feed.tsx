import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeedsApi, selectFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeeds);
  const dispatch = useDispatch();
  console.log(orders.length);

  useEffect(() => {
    dispatch(fetchFeedsApi());
  }, [orders.length]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeedsApi())} />;
};
