import * as fromReducer from '../reducers/user-request.reducer';
import * as fromAction from '../actions';

const { initialState } = fromReducer;
const requestId = 'testUserRequest';
const mockedUserRequest = {
  requestId: requestId,
};
describe('User Request Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.UserRequestActions;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('SUBMIT_USER_REQUEST', () => {
    it('should submit user request', () => {
      const action = new fromAction.SubmitUserRequestSuccess(mockedUserRequest);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedUserRequest);
    });
  });
});
