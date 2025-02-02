import { TOrder } from '@utils-types';
import feedDataSlice, {
  fetchFeed,
  fetchFeedById,
  initialState
} from './feedSlice';

describe('Проверка редьюсера feed', () => {
  describe('Проверка fetchFeed', () => {
    const actionsFeed = {
      pending: {
        type: fetchFeed.pending.type,
        payload: null
      },
      rejected: {
        type: fetchFeed.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: fetchFeed.fulfilled.type,
        payload: {
          orders: 3333,
          total: 555,
          totalToday: 444
        }
      }
    };

    test('Экшен fetchFeed pending', () => {
      const result = feedDataSlice(initialState, actionsFeed.pending);
      expect(result.isLoading).toBe(true);
    });

    test('Экшен fetchFeed rejected', () => {
      const result = feedDataSlice(initialState, actionsFeed.rejected);
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(actionsFeed.rejected.error.message);
    });

    test('Экшен fetchFeed fulfilled', () => {
      const result = feedDataSlice(initialState, actionsFeed.fulfilled);
      expect(result.isLoading).toBe(false);
      expect(result.orders).toEqual(actionsFeed.fulfilled.payload.orders);
      expect(result.total).toEqual(actionsFeed.fulfilled.payload.total);
      expect(result.totalToday).toEqual(
        actionsFeed.fulfilled.payload.totalToday
      );
    });
  });

  describe('Проверка fetchFeedById', () => {
    const order: TOrder = {
      _id: 'id',
      status: 'status',
      name: 'name',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      number: 25,
      ingredients: []
    };

    const actionsFeedByID = {
      pending: {
        type: fetchFeedById.pending.type,
        payload: null
      },
      rejected: {
        type: fetchFeedById.rejected.type,
        error: { message: 'some error' }
      },
      fulfilled: {
        type: fetchFeedById.fulfilled.type,
        payload: {
          orders: [order]
        }
      }
    };

    test('Экшен fetchFeedById pending', () => {
      const result = feedDataSlice(initialState, actionsFeedByID.pending);
      expect(result.isLoading).toBe(true);
    });

    test('Экшен fetchFeedById rejected', () => {
      const result = feedDataSlice(initialState, actionsFeedByID.rejected);
      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(actionsFeedByID.rejected.error.message);
    });

    test('Экшен fetchFeedById fulfilled', () => {
      const result = feedDataSlice(initialState, actionsFeedByID.fulfilled);
      expect(result.isLoading).toBe(false);
      expect(result.orderModalData).toEqual(order);
    });
  });
});
