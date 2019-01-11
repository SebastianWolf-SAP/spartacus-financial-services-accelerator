import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromPolicyStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';

@Component({
  selector: 'fsa-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesComponent implements OnInit {

  constructor(
    private store: Store<fromPolicyStore.UserState>,
    private config: OccConfig
  ) {}

  policies$;
  policiesLoaded$;

  noPoliciesText = 'You have no Policies!';

  ngOnInit() {
    this.policies$ = this.store.pipe(select(fromPolicyStore.getPolicyData));
    this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPoliciesLoaded));
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
