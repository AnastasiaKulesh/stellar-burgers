import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getConstructorItemsState } from '../../services/slices/constructorItemsSlice';
import { orderBurger } from '../../services/slices/constructorItemsSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные orderRequest и orderModalData из стора */

  const { constructorItems } = useSelector(getConstructorItemsState);

  const orderRequest = false;

  const orderModalData = null;

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    let ids = constructorItems.ingredients.map((item) => item._id);

    const data = [constructorItems.bun._id, ...ids, constructorItems.bun._id];
    console.log(data);
    dispatch(orderBurger(data));
  };
  const closeOrderModal = () => {}; // TODO: добавить dispatch и закрытие окна

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
