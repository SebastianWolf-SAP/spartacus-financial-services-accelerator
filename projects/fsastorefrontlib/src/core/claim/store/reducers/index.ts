import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  MetaReducer,
  ActionReducer,
} from '@ngrx/store';
import * as fromClaimReducer from './claim.reducer';
import { FSClaimState, StateWithClaim } from '../claim-state';
import { AuthActions } from '@spartacus/core';
import * as fromClaimAction from '../../../my-account/store/actions';

export function getReducers(): ActionReducerMap<FSClaimState> {
  return {
    claim: fromClaimReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<FSClaimState>
> = new InjectionToken<ActionReducerMap<FSClaimState>>('FSClaimReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const getClaimState: MemoizedSelector<
  StateWithClaim,
  FSClaimState
> = createFeatureSelector<FSClaimState>('claim');

export function clearClaimState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (
      action.type === AuthActions.LOGOUT ||
      action.type === fromClaimAction.CREATE_CLAIM
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearClaimState];
