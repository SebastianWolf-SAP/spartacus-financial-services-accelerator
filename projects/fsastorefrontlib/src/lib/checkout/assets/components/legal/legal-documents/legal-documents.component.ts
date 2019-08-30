import { Component, OnInit } from '@angular/core';
import { Cart, CartService, CmsConfig } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-legal-documents',
  templateUrl: './legal-documents.component.html'
})
export class LegalDocumentsComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(
    protected cartService: CartService,
    protected config: CmsConfig
  ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
