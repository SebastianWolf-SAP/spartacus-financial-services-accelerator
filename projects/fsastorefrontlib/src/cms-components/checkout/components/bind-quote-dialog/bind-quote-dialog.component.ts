import { FSCartService } from '../../../../core/checkout/services';
import { filter, tap } from 'rxjs/operators';
import {
  FSCart,
  BindingStateType,
} from './../../../../occ/occ-models/occ.models';
import { QuoteService } from './../../../../core/my-account/services/quote.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fsa-bind-quote-dialog',
  templateUrl: './bind-quote-dialog.component.html',
})
export class BindQuoteDialogComponent {
  cartCode: string;
  nextStepUrl: string;
  subscription = new Subscription();

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected modalService: ModalService,
    protected quoteService: QuoteService,
    protected routingService: RoutingService,
    protected cartService: FSCartService
  ) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  bindQuote() {
    this.quoteService.bindQuote(this.cartCode);
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          filter(
            cart =>
              (<FSCart>cart).insuranceQuote.state.code === BindingStateType.BIND
          ),
          tap(() => {
            this.routingService.go(this.nextStepUrl);
            this.subscription.unsubscribe();
          })
        )
        .subscribe()
    );
  }
}
