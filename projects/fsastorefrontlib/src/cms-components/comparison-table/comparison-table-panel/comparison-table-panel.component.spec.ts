import { Component, DebugElement, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponent } from '@spartacus/core';
import { CmsComponentData, MediaModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BillingTimeConnector } from './../../../core/product-pricing/connectors/billing-time.connector';
import { PricingService } from './../../../core/product-pricing/facade/pricing.service';
import { ComparisonPanelCMSComponent } from './../../../occ/occ-models/cms-component.models';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';
import { ComparisonTablePanelComponent } from './comparison-table-panel.component';

@Component({
  // tslint:disable
  selector: 'cx-fs-comparison-table-panel-item',
  template: '',
})
class ComparisonTablePanelItemComponent {
  @Input()
  productCode;
  @Input()
  billingTimes;
  @Input()
  pricingData;
}
const componentData: ComparisonPanelCMSComponent = {
  uid: 'testComparisonPanel',
  typeCode: 'ComparisonPanelCMSComponent',
  products: 'TEST_PRODUCT_1 TEST_PRODUCT_2',
};

const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'componentDataTest',
};

const billingTimes = [
  {
    code: 'petcare',
    name: 'Pet Care',
    helpContent: 'Test help content',
    orderNumber: 1,
  },
  {
    code: 'hospitalbenefit',
    name: 'Hospital Benefit',
    helpContent: 'Test help content',
    orderNumber: 2,
  },
];

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const pricingData: PricingData = {
  priceAttributeGroups: [
    {
      name: 'test',
      priceAttributes: [
        {
          key: 'tripDestination',
          value: 'Europe',
        },
        {
          key: 'tripStartDate',
          value: '2022-02-02',
        },
      ],
    },
  ],
};

class MockBillingTimeConnector {
  getBillingTimes(): Observable<any> {
    return of(billingTimes);
  }
}

class MockFormDataService {
  getCurrentFormData(): Observable<YFormData> {
    return of();
  }
  getFormData(): Observable<YFormData> {
    return of();
  }
}

class MockPricingService {
  buildPricingData(): PricingData {
    return pricingData;
  }
}
describe('ComparisonTablePanelComponent', () => {
  let comparisonTablePanelComponent: ComparisonTablePanelComponent;
  let fixture: ComponentFixture<ComparisonTablePanelComponent>;
  let mockBillingTimeConnector: BillingTimeConnector;
  let mockFormDataService: FormDataService;
  let mockPricingService: PricingService;

  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbTabsetModule, NgbTooltipModule, MediaModule],
      providers: [
        {
          provide: CmsComponentData,
          useValue: mockCmsComponentData,
        },
        {
          provide: BillingTimeConnector,
          useClass: MockBillingTimeConnector,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
        {
          provide: PricingService,
          useClass: MockPricingService,
        },
      ],
      declarations: [
        ComparisonTablePanelComponent,
        ComparisonTablePanelItemComponent,
      ],
    }).compileComponents();
    mockBillingTimeConnector = TestBed.get(BillingTimeConnector as Type<
      BillingTimeConnector
    >);
    mockFormDataService = TestBed.get(FormDataService as Type<FormDataService>);
    mockPricingService = TestBed.get(PricingService as Type<PricingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTablePanelComponent);
    comparisonTablePanelComponent = fixture.componentInstance;

    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(comparisonTablePanelComponent).toBeTruthy();
  });

  it('should create comparison panel with pricing data and billing times', () => {
    spyOn(mockPricingService, 'buildPricingData').and.stub();
    spyOn(mockFormDataService, 'getFormData').and.returnValue(of(formData));
    spyOn(mockFormDataService, 'getCurrentFormData').and.returnValue(
      of(formData)
    );
    comparisonTablePanelComponent.ngOnInit();

    expect(mockPricingService.buildPricingData).toHaveBeenCalled();
    expect(mockFormDataService.getCurrentFormData).toHaveBeenCalled();
  });

  it('should not build pricing data', () => {
    const currentFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
    };
    spyOn(mockPricingService, 'buildPricingData').and.stub();
    spyOn(mockFormDataService, 'getFormData').and.returnValue(
      of(currentFormData)
    );
    spyOn(mockFormDataService, 'getCurrentFormData').and.returnValue(
      of(currentFormData)
    );
    comparisonTablePanelComponent.ngOnInit();

    expect(mockPricingService.buildPricingData).not.toHaveBeenCalled();
  });

  it('should render billing times help content', () => {
    fixture.detectChanges();
    const billingTimeHelpContent = el.query(By.css('.table-cell-wrapper'))
      .nativeElement;
    expect(billingTimeHelpContent).toBeTruthy();
  });

  it('should render comparison table panel item', () => {
    fixture.detectChanges();
    const comparisonTablePanelItem = el.query(
      By.css('cx-fs-comparison-table-panel-item')
    ).nativeElement;
    expect(comparisonTablePanelItem).toBeTruthy();
  });
});
