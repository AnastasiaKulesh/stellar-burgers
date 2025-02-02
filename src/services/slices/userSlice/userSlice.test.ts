import userSlice, {
  userCheck,
  userRegister,
  userLogin,
  userLogout,
  userOrders,
  updateUser,
  initialState
} from './userSlice';
import { TOrder, TUser } from '../../../utils/types';

describe('Проверка редьюсера user', () => {
  describe('Проверка userCheck', () => {
    const user: TUser = {
      email: 'email',
      name: 'user'
    };

    const actions = {
      pending: {
        type: userCheck.pending.type
      },
      rejected: {
        type: userCheck.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: userCheck.fulfilled.type,
        payload: { user: user }
      }
    };

    test('Экшен pending', () => {
      const result = userSlice(initialState, actions.pending);
      expect(result.isAuth).toBe(false);
    });

    test('Экшен rejected', () => {
      const result = userSlice(initialState, actions.rejected);
      expect(result.isAuth).toBe(false);
      expect(result.authCheck).toBe(true);
      expect(result.error).toBe(actions.rejected.error.message);
    });

    test('Экшен fulfilled', () => {
      const result = userSlice(initialState, actions.fulfilled);
      expect(result.isAuth).toBe(true);
      expect(result.authCheck).toBe(true);
      expect(result.user).toEqual(user);
    });
  });

  describe('Проверка userRegister', () => {
    const actions = {
      pending: {
        type: userRegister.pending.type
      },
      rejected: {
        type: userRegister.rejected.type,
        error: { message: 'some error' }
      }
    };

    test('Экшен pending', () => {
      const result = userSlice(initialState, actions.pending);
      expect(result.error).toBe(null);
    });

    test('Экшен rejected', () => {
      const result = userSlice(initialState, actions.rejected);
      expect(result.error).toBe(actions.rejected.error.message);
    });
  });

  describe('Проверка userLogin', () => {
    const user: TUser = {
      email: 'email',
      name: 'user'
    };

    const actions = {
      pending: {
        type: userLogin.pending.type
      },
      rejected: {
        type: userLogin.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: userLogin.fulfilled.type,
        payload: { user: user }
      }
    };

    test('Экшен pending', () => {
      const result = userSlice(initialState, actions.pending);
      expect(result.isAuth).toBe(false);
    });

    test('Экшен rejected', () => {
      const result = userSlice(initialState, actions.rejected);
      expect(result.isAuth).toBe(false);
      expect(result.error).toBe(actions.rejected.error.message);
    });

    test('Экшен fulfilled', () => {
      const result = userSlice(initialState, actions.fulfilled);
      expect(result.isAuth).toBe(true);
      expect(result.user).toEqual(user);
    });
  });

  describe('Проверка userLogout', () => {
    const user: TUser = {
      email: 'email',
      name: 'user'
    };

    const actions = {
      pending: {
        type: userLogout.pending.type
      },
      rejected: {
        type: userLogout.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: userLogout.fulfilled.type,
        payload: { user: user }
      }
    };

    test('Экшен pending', () => {
      const result = userSlice(initialState, actions.pending);
      expect(result.authCheck).toBe(false);
      expect(result.isAuth).toBe(false);
      expect(result.user).toBe(null);
    });

    test('Экшен rejected', () => {
      const result = userSlice(initialState, actions.rejected);
      expect(result.authCheck).toBe(false);
      expect(result.isAuth).toBe(false);
      expect(result.error).toBe(actions.rejected.error.message);
    });

    test('Экшен fulfilled', () => {
      const result = userSlice(initialState, actions.fulfilled);
      expect(result.authCheck).toBe(true);
      expect(result.isAuth).toBe(false);
      expect(result.user).toBe(null);
    });
  });

  describe('Проверка userOrders', () => {
    const order: TOrder = {
      _id: 'id',
      status: 'status',
      name: 'name',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      number: 25,
      ingredients: []
    };

    const actions = {
      pending: {
        type: userOrders.pending.type
      },
      rejected: {
        type: userOrders.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: userOrders.fulfilled.type,
        payload: [order]
      }
    };

    test('Экшен pending', () => {
      const result = userSlice(initialState, actions.pending);
      expect(result.error).toBe(null);
    });

    test('Экшен rejected', () => {
      const result = userSlice(initialState, actions.rejected);
      expect(result.error).toBe(actions.rejected.error.message);
    });

    test('Экшен fulfilled', () => {
      const result = userSlice(initialState, actions.fulfilled);
      expect(result.orders[0]).toBe(order);
    });
  });

  describe('Проверка updateUser', () => {
    const user: TUser = {
      email: 'email',
      name: 'user'
    };

    const actions = {
      pending: {
        type: updateUser.pending.type
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: user }
      }
    };

    test('Экшен pending', () => {
      const result = userSlice(initialState, actions.pending);
      expect(result.isAuth).toBe(true);
      expect(result.user).toBe(null);
    });

    test('Экшен rejected', () => {
      const result = userSlice(initialState, actions.rejected);
      expect(result.error).toBe(actions.rejected.error.message);
    });

    test('Экшен fulfilled', () => {
      const result = userSlice(initialState, actions.fulfilled);
      expect(result.isAuth).toBe(true);
      expect(result.user).toBe(user);
    });
  });
});
