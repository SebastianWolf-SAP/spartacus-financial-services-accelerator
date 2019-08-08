import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsConfig, CmsModule, ConfigModule, I18nModule, RoutesConfig, RoutingConfig, UrlModule } from '@spartacus/core';
import { PageComponentModule, SpinnerModule } from '@spartacus/storefront';
import { FSCartService } from '../../checkout/assets/services';
import { OccBillingTimeService } from '../../occ/billing-time/billing-time.service';
import { ComparisonTableContainerComponent } from './comparison-table-container/comparison-table-container.component';
// tslint:disable-next-line:max-line-length
import { ComparisonTablePanelItemComponent } from './comparison-table-container/comparison-table-tab/comparison-table-panel/comparison-table-panel-item/comparison-table-panel-item.component';
// tslint:disable-next-line:max-line-length
import { ComparisonTablePanelComponent } from './comparison-table-container/comparison-table-tab/comparison-table-panel/comparison-table-panel.component';
import { ComparisonTableTabComponent } from './comparison-table-container/comparison-table-tab/comparison-table-tab.component';
import { ComparisonTableService } from './comparison-table.service';
import { PricingService } from '../../occ/pricing/pricing.service';


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
          component: ComparisonTableContainerComponent
        },
        CMSComparisonTabComponent: {
          component: ComparisonTableTabComponent
        },
        ComparisonPanelCMSComponent: {
          component: ComparisonTablePanelComponent
        }
      }
    })
  ],
  declarations: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent
  ],
  entryComponents: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent
  ],
  providers: [OccBillingTimeService, ComparisonTableService, FSCartService, PricingService]
})
export class ComparisonTableModule { }
