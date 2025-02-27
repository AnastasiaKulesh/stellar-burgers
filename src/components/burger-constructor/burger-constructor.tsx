import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearOrderData,
  getConstructorItemsState,
  getOrderModalData,
  getOrderRequestState
} from '../../services/slices/constructorItemsSlice';
import { orderBurger } from '../../services/slices/constructorItemsSlice';
import { getUserState } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const userData = useSelector(getUserState);

  const { constructorItems } = useSelector(getConstructorItemsState);
  const orderRequest = useSelector(getOrderRequestState);
  const orderModalData = useSelector(getOrderModalData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!userData.isAuth) {
      navigate('/login');
    } else {
      let ids = constructorItems.ingredients.map((item) => item._id);

      const data = [constructorItems.bun._id, ...ids, constructorItems.bun._id];
      dispatch(orderBurger(data));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
