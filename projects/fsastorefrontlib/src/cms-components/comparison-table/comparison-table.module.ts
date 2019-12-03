import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsConfig,
  CmsModule,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule, SpinnerModule } from '@spartacus/storefront';
import { FSCartService, PricingService } from '../../core/checkout/services';
import { FSProductService } from '../../core/checkout/services/product/fs-product.service';
import { OccBillingTimeAdapter } from '../../occ/services/billing-time/occ-billing-time.adapter';
import { OccProductPricingAdapter } from '../../occ/services/pricing/occ-product-pricing.adapter';
import { ComparisonTableContainerComponent } from './comparison-table-container/comparison-table-container.component';
import { ComparisonTablePanelItemComponent } from './comaprison-table-panel-item/comparison-table-panel-item.component';
import { ComparisonTablePanelComponent } from './comparison-table-panel/comparison-table-panel.component';
import { ComparisonTableTabComponent } from './comparison-table-tab/comparison-table-tab.component';
import { ComparisonTableService } from './comparison-table.service';

@NgModule({
  imports: [
    CommonModule,
    PageComponentModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    CmsModule,
    NgbTabsetModule,
    NgbTooltipModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        CMSMultiComparisonTabContainer: {
          component: ComparisonTableContainerComponent,
        },
        CMSComparisonTabComponent: {
          component: ComparisonTableTabComponent,
        },
        ComparisonPanelCMSComponent: {
          component: ComparisonTablePanelComponent,
        },
      },
    }),
  ],
  declarations: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent,
  ],
  entryComponents: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent,
  ],
  providers: [
    OccBillingTimeAdapter,
    OccProductPricingAdapter,
    ComparisonTableService,
    FSCartService,
    FSProductService,
    PricingService,
  ],
})
export class ComparisonTableModule {}
