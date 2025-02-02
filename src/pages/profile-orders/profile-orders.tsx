import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice/userSlice';
import { userOrders } from '../../services/slices/userSlice/userSlice';

export const ProfileOrders: FC = () => {
  const { orders } = useSelector(getUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
