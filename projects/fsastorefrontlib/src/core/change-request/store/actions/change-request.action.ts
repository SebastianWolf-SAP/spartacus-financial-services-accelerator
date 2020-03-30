import { StateLoaderActions } from '@spartacus/core';
import { CHANGE_REQUEST_DATA } from '../change-request-state';

export const LOAD_CHANGE_REQUEST = '[Change Request] Load Change Request';
export const LOAD_CHANGE_REQUEST_FAIL =
  '[Change Request] Load Change Request Fail';
export const LOAD_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Load Change Request Success';

export const CREATE_CHANGE_REQUEST = '[Change Request] Create Change Request';
export const CREATE_CHANGE_REQUEST_FAIL =
  '[Change Request] Create Change Request Fail';
export const CREATE_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Create Change Request Success';

export const SIMULATE_CHANGE_REQUEST =
  '[Change Request] Simulate Change Request';
export const SIMULATE_CHANGE_REQUEST_FAIL =
  '[Change Request] Simulate Change Request Fail';
export const SIMULATE_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Simulate Change Request Success';

export const CANCEL_CHANGE_REQUEST = '[Change Request] Cancel Change Request';
export const CANCEL_CHANGE_REQUEST_FAIL =
  '[Change Request] Cancel Change Request Fail';
export const CANCEL_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Cancel Change Request Success';

export class CreateChangeRequest extends StateLoaderActions.LoaderLoadAction {
  readonly type = CREATE_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CreateChangeRequestFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CREATE_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class CreateChangeRequestSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CREATE_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class LoadChangeRequest extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class LoadChangeRequestFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class LoadChangeRequestSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class SimulateChangeRequest extends StateLoaderActions.LoaderLoadAction {
  readonly type = SIMULATE_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class SimulateChangeRequestFail extends StateLoaderActions.LoaderFailAction {
  readonly type = SIMULATE_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class SimulateChangeRequestSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = SIMULATE_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CancelChangeRequest extends StateLoaderActions.LoaderLoadAction {
  readonly type = CANCEL_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CancelChangeRequestSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CANCEL_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CancelChangeRequestFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CANCEL_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export type ChangeRequestAction =
  | CreateChangeRequest
  | CreateChangeRequestFail
  | CreateChangeRequestSuccess
  | LoadChangeRequest
  | LoadChangeRequestFail
  | LoadChangeRequestSuccess
  | SimulateChangeRequest
  | SimulateChangeRequestFail
  | SimulateChangeRequestSuccess
  | CancelChangeRequest
  | CancelChangeRequestSuccess
  | CancelChangeRequestFail;
