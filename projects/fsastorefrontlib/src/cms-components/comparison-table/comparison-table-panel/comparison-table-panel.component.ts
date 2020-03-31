import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BillingTimeConnector } from '../../../core/product-pricing/connectors/billing-time.connector';
import { PricingService } from '../../../core/product-pricing/facade/pricing.service';
import {
  ComparisonPanelCMSComponent,
  PricingData,
} from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  comparisonPanel: Observable<ComparisonPanelCMSComponent>;
  productList: string[];
  billingData: Observable<any>;
  pricingData: PricingData = {};

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
    protected billingTimeConnector: BillingTimeConnector,
    protected formDataService: FormDataService,
    protected pricingService: PricingService
  ) {}

  ngOnInit() {
    this.comparisonPanel = this.componentData.data$;
    this.subscription.add(
      this.comparisonPanel
        .pipe(
          map(data => {
            const productCodes = data.products.split(' ');
            this.billingData = this.billingTimeConnector.getBillingTimes(
              productCodes
            );
          })
        )
        .subscribe()
    );

    this.subscription.add(
      this.formDataService
        .getCurrentFormData()
        .pipe(
          map(currentForm => currentForm.id),
          switchMap(formDataId => this.formDataService.getFormData(formDataId))
        )
        .subscribe(formData => {
          if (formData.content) {
            this.pricingData = this.pricingService.buildPricingData(
              JSON.parse(formData.content)
            );
          }
        })
    );
  }

  getProductList(): string[] {
    this.componentData.data$.subscribe(data => {
      this.productList = data.products.split(' ');
    });
    return this.productList;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
