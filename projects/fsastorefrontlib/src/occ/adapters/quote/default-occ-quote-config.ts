import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccQuoteConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        quotes: 'users/${userId}/insurance-quotes',
        updateQuote: 'users/${userId}/carts/${cartId}/insurance-quotes',
        bindQuote: 'users/${userId}/carts/${cartId}/insurance-quotes/action',
      },
    },
  },
};
