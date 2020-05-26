import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSUserRequest } from '../../../occ/occ-models';
import { FSClaimState } from '../../claim/store/claim-state';
import * as fromSelector from '../../claim/store/selectors/claim.selector';
import { FormDataStorageService } from '@fsa/dynamicforms';

@Injectable()
export class UserRequestService {
  constructor(
    protected store: Store<FSClaimState>,
    protected authService: AuthService,
    protected formDataStorageService: FormDataStorageService
  ) {}

  loadUserRequestFormData(userRequest: FSUserRequest) {
    userRequest.configurationSteps.forEach(stepData => {
      if (stepData.yformConfigurator) {
        this.formDataStorageService.setFormDataToLocalStorage(
          stepData.yformConfigurator
        );
      }
    });
  }

  getClaim(): Observable<any> {
    return this.store.select(fromSelector.getClaimContent);
  }
}
