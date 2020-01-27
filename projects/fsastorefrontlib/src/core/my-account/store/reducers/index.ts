import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import * as fromClaimPoliciesReducer from './claim-policies.reducer';
import * as fromClaimReducer from './claim.reducer';
import * as fromPolicyReducer from './policy.reducer';
import * as fromPremiumCalendarReducer from './premium-calendar.reducer';
import * as fromQuoteReducer from './quote.reducer';

export interface UserState {
  quotes: fromQuoteReducer.QuoteState;
  policies: fromPolicyReducer.PolicyState;
  premiumCalendar: fromPremiumCalendarReducer.PremiumCalendarState;
  claims: fromClaimReducer.ClaimState;
  claimPolicies: fromClaimPoliciesReducer.ClaimPoliciesState;
}

export function getReducers(): ActionReducerMap<UserState> {
  return {
    quotes: fromQuoteReducer.reducer,
    policies: fromPolicyReducer.reducer,
    premiumCalendar: fromPremiumCalendarReducer.reducer,
    claims: fromClaimReducer.reducer,
    claimPolicies: fromClaimPoliciesReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<UserState>
> = new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const getUserState: MemoizedSelector<
  any,
  UserState
> = createFeatureSelector<UserState>('assets');

export function cleanUserState(reducer) {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
