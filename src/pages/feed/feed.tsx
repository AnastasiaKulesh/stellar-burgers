import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { fetchFeed, getFeedDataState } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(getFeedDataState);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
