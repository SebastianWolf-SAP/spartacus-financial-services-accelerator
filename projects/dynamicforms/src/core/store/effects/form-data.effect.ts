import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FormConnector } from '../../connectors/form-connector';
import * as fromActions from '../actions';

@Injectable()
export class FormDataEffects {
  @Effect()
  loadFormData$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_FORM_DATA),
    map((action: fromActions.LoadFormData) => action.payload),
    mergeMap(payload => {
      return this.formConnector.getFormData(payload.formDataId).pipe(
        map((formData: any) => {
          return new fromActions.LoadFormDataSuccess(formData);
        }),
        catchError(error => {
          return of(new fromActions.LoadFormDataFail(JSON.stringify(error)));
        })
      );
    })
  );

  @Effect()
  saveFormData$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.SAVE_FORM_DATA),
    map((action: fromActions.SaveFormData) => action.payload),
    mergeMap(payload => {
      return this.formConnector.saveFormData(payload.formData).pipe(
        map((formData: any) => {
          return new fromActions.SaveFormDataSuccess(formData);
        }),
        catchError(error => {
          return of(new fromActions.SaveFormDataFail(JSON.stringify(error)));
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private formConnector: FormConnector
  ) {}
}
