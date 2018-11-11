import { Component, OnInit } from '@angular/core';
import * as fromClaimStore from '../../../my-account/applications/store';
import { Observable } from 'rxjs';
import { ClaimsService } from '../../../my-account/applications/services';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'fsa-claims-page-layout',
  templateUrl: './claims-page-layout.component.html',
  styleUrls: ['./claims-page-layout.component.scss']
})
export class ClaimsPageLayoutComponent implements OnInit {
  claims$: Observable<any>;
  claims = "Claims"

  constructor(
    protected store: Store<fromClaimStore.ClaimState>,
    protected claimsService: ClaimsService
  ) {}
  
  ngOnInit() {
    this.claimsService.loadClaims();
    this.claims$ = this.store.pipe(select(fromClaimStore.getActiveClaims));
  }
}
