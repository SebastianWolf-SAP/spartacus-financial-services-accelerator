import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  CheckoutDeliveryService,
  CheckoutService,
  Order,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { CheckoutSelectors, FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';
import { FSCart, FSOrderEntry } from '../../../occ/occ-models/occ.models';

@Injectable()
export class FSCheckoutService extends CheckoutService {
  constructor(
    protected fsStore: Store<FSStateWithCheckout>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {
    super(fsStore, userIdService, activeCartService);
  }

  orderPlaced: boolean;
  mockedDeliveryMode = 'financial-default';

  setIdentificationType(identificationType: string) {
    combineLatest([
      this.activeCartService.getActiveCartId(),
      this.userIdService.getUserId(),
    ])
      .subscribe(([activeCartCode, occUserId]) => {
        if (activeCartCode && occUserId) {
          this.fsStore.dispatch(
            new fromFSAction.SetIdentificationType({
              identificationType: identificationType,
              cartId: activeCartCode,
              userId: occUserId,
            })
          );
        }
      })
      .unsubscribe();
    return this.fsStore.pipe(select(CheckoutSelectors.getIdentificationType));
  }

  setLegalInformation() {
    this.fsStore.dispatch(
      new fromFSAction.SetLegalInformationSuccess({
        legalInformation: true,
      })
    );
  }
  setPaymentType(code: string) {
    this.fsStore.dispatch(
      new fromFSAction.SetPaymentTypeSuccess({
        code,
      })
    );
  }
  getLegalInformation(): Observable<boolean> {
    return this.fsStore.pipe(select(CheckoutSelectors.getLegalInformation));
  }

  getPaymentType(): Observable<string> {
    return this.fsStore.pipe(select(CheckoutSelectors.getPaymentType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
  }

  filterRemoveableEntries(cart: FSCart | Order) {
    const cartEntries: FSOrderEntry[] = cart?.deliveryOrderGroups[0]?.entries;
    if (cartEntries?.length > 0) {
      return cartEntries.filter(item => item.removeable);
    }
  }
}
