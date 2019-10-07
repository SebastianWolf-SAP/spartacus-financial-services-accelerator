import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
} from '@ngrx/store';
import * as fromClaimPolicies from './claim-policies.reducer';
import * as fromClaimReducer from './claim.reducer';
import * as fromPolicyReducer from './policy.reducer';
import * as fromPremiumCalendarReducer from './premium-calendar.reducer';
import * as fromQuoteReducer from './quote.reducer';

export interface UserState {
  quotes: fromQuoteReducer.QuoteState;
  policies: fromPolicyReducer.PolicyState;
  premiumCalendar: fromPremiumCalendarReducer.PremiumCalendarState;
  claims: fromClaimReducer.ClaimState;
  claimPolicies: fromClaimPolicies.ClaimPoliciesState;
}

export function getReducers(): ActionReducerMap<UserState> {
  return {
    quotes: fromQuoteReducer.reducer,
    policies: fromPolicyReducer.reducer,
    premiumCalendar: fromPremiumCalendarReducer.reducer,
    claims: fromClaimReducer.reducer,
    claimPolicies: fromClaimPolicies.reducer
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
