import { CheckoutActions, Order } from '@spartacus/core';
import * as fromAction from '../actions';
import { FSCheckoutAction } from '../actions/fs-checkout.action';
import { FSCheckoutStepsState } from '../fs-checkout-state';

export const initialState: FSCheckoutStepsState = {
  legalInformation: false,
  identificationType: false,
  address: {},
  deliveryMode: {
    supported: {},
    selected: '',
  },
  paymentDetails: {},
  orderDetails: {},
};

export function reducer(
  state = initialState,
  action:
    | FSCheckoutAction
    | CheckoutActions.CheckoutAction
    | CheckoutActions.CheckoutClearMiscsData
): FSCheckoutStepsState {
  switch (action.type) {
    case fromAction.SET_IDENTIFICATION_TYPE_SUCCESS: {
      const identificationType = true;
      return {
        ...state,
        identificationType,
      };
    }
    case fromAction.SET_IDENTIFICATION_TYPE_FAIL: {
      const identificationType = false;
      return {
        ...state,
        identificationType,
      };
    }

    case CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS:
    case CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS: {
      return {
        ...state,
        paymentDetails: action.payload,
      };
    }

    case CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL: {
      const paymentDetails = action.payload;
      if (paymentDetails['hasError']) {
        return {
          ...state,
          paymentDetails,
        };
      }

      return state;
    }

    case CheckoutActions.PLACE_ORDER_SUCCESS: {
      const orderDetails: Order = action.payload;

      return {
        ...state,
        orderDetails,
      };
    }

    case CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS: {
      return {
        ...state,
        address: action.payload.deliveryAddress,
        deliveryMode: {
          ...state.deliveryMode,
          selected:
            action.payload.deliveryMode && action.payload.deliveryMode.code,
        },
        paymentDetails: action.payload.paymentInfo,
      };
    }
  }
  return state;
}
