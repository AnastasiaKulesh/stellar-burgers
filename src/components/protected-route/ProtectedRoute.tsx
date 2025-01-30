import { getUserState } from '../../services/slices/userSlice';
import { useSelector } from '../..//services/store';
import { Preloader } from '../ui/preloader/preloader';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { authCheck, user } = useSelector(getUserState);

  if (!authCheck) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  return children;
};
