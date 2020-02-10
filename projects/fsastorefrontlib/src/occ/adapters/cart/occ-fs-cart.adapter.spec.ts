import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccFSCartAdapter } from './occ-fs-cart.adapter';
import { OccConfig } from '@spartacus/core';
import { PricingData } from '../../../core/models/pricing.interface';

const userId = 'userId';
const cartId = 'cartId';
const productCode = 'product123';
const quantity = 1;
const entryNumber = '1';
const identificationType = 'video_identification';

const usersEndpoint = '/users';
const cartsEndpoint = '/carts';

const bundleTemplateId = 'bundleTemplate';

const pricingData: PricingData = {};

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

describe('OccFSCartAdapter', () => {
  let adapter: OccFSCartAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccFSCartAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccFSCartAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('addToCart', () => {
    it('should add product to cart', async(() => {
      adapter
        .addToCart(userId, cartId, productCode, quantity, entryNumber)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              `/${cartId}` +
              '/fs-add-to-cart' &&
          req.params.append('productCode', productCode) &&
          req.params.append('quantity', quantity.toString()) &&
          req.params.append('entryNumber', entryNumber) &&
          req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });

  describe('startBundle', () => {
    it('start bundle', async(() => {
      adapter
        .startBundle(
          userId,
          cartId,
          productCode,
          bundleTemplateId,
          quantity,
          pricingData
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              `/${cartId}` +
              '/fs-start-bundle' &&
          req.params.append('bundleTemplateId', bundleTemplateId) &&
          req.params.append('productCode', productCode) &&
          req.params.append('quantity', quantity.toString()) &&
          req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });
});
