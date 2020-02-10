import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccClaimAdapter } from './occ-claim.adapter';
import { OccConfig } from '@spartacus/core';

const userId = '123';
const claimNumber = 'CL0000012';

const policyNumber = 'PL0000012';
const contractNumber = 'CO0000012';

const usersEndpoint = '/users';
const claimsEndpoint = '/claims';

const claimsActionEndpoit = '/action';

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OccClaimsService', () => {
  let adapter: OccClaimAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccClaimAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccClaimAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getClaims', () => {
    it('should fetch user Claims', async(() => {
      adapter.getClaims(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + claimsEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('deleteClaim', () => {
    it('delete specified claim by id', async(() => {
      adapter.deleteClaim(userId, claimNumber).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint + `/${userId}` + claimsEndpoint + `/${claimNumber}` &&
          req.method === 'DELETE'
        );
      }, `DELETE method and url`);
    }));
  });

  describe('createClaim', () => {
    it('create claim for specified policyId and contractId', async(() => {
      adapter.createClaim(userId, policyNumber, contractNumber).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              claimsEndpoint +
              `/create?contractId=` +
              `${contractNumber}&policyId=` +
              `${policyNumber}` && req.method === 'POST'
        );
      }, `POST method and url`);
    }));

    describe('submit claim', () => {
      it('should submit user claim', async(() => {
        adapter.submitClaim(userId, claimNumber).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url ===
              usersEndpoint +
                `/${userId}` +
                claimsEndpoint +
                `/${claimNumber}` +
                claimsActionEndpoit && req.method === 'POST'
          );
        }, `POST method and url`);
      }));
    });
  });
});
