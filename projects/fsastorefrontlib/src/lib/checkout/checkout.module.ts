import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig
} from '@spartacus/core';
import {
  CardModule,
  CartNotEmptyGuard,
  CmsPageGuard,
  DeliveryModeSetGuard,
  MediaModule,
  PageComponentModule,
  PageLayoutComponent,
  PaymentDetailsSetGuard,
  PaymentFormModule,
  PaymentMethodModule,
  ShippingAddressSetGuard,
  SpinnerModule
} from '@spartacus/storefront';
import { CatagoryStepGuard } from '../../cms-components/checkout/guards/category-step-guard';
import { AccordionModule } from '../accordion/accordion.module';
import { OccFSCartService } from '../occ/cart/fs-cart.service';
import { AddOptionsComponent } from './assets/components/add-options/add-options.component';
import { FSCheckoutProgressComponent } from './assets/components/checkout-progress/fs-checkout-progress.component';
import { FSCheckoutProgressModule } from './assets/components/checkout-progress/fs-checkout-progress.module';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';
import { FSMiniCartComponent } from './assets/components/mini-cart/mini-cart.component';
import { FsaOrderConfirmationComponent } from './assets/components/order-confirmation/order-confirmation.component';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { FSCartService } from './assets/services';
import { FSCategoryService } from './assets/services/fs-category.service';
import { effects } from './assets/store/effects/index';
import { FsPaymentMethodComponent } from './assets/components/payment-method/fs-payment-method.component';
import { FsPaymentFormModule } from './assets/components/payment-method/payment-form/fs-payment-form.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard, CatagoryStepGuard],
    data: {
      cxRoute: 'generalInformation',
      pageLabel: 'generalInformationForm'
    },
    component: PageLayoutComponent
  },
  {
    path: null, // can be null only if pathS property is defined in ConfigModule
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'addOptions', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'add-options' // ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
    },
    component: PageLayoutComponent // SPA LAYOUT Component you're targeting
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quoteReview',
      pageLabel: 'quote-review'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'checkoutPaymentDetails',
      pageLabel: 'checkout-payment-details'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      CartNotEmptyGuard,
      PaymentDetailsSetGuard
    ],
    data: {
      cxRoute: 'finalReview',
      pageLabel: 'final-review'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'orderConfirmation',
      pageLabel: 'orderConfirmationPage'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    FsPaymentFormModule,
    PaymentMethodModule,
    I18nModule,
    NgbTooltipModule,
    CommonModule,
    PageComponentModule,
    MediaModule,
    SpinnerModule,
    AccordionModule,
    CardModule,
    FSCheckoutProgressModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: FsPaymentMethodComponent,
          guards: [
            AuthGuard,
            CartNotEmptyGuard,
            ShippingAddressSetGuard,
            DeliveryModeSetGuard,
          ],
        },
        AddOptionsFlex: {
          // mapping hybris component (defined in impex) - This is acctualy flexType defined in impex for that component
          component: AddOptionsComponent // to SPA component
        },
        MiniCartFlex: {
          component: FSMiniCartComponent
        },
        QuoteReviewFlex: {
          component: QuoteReviewComponent
        },
        PaymentDetailsFlex: {
          component: FsPaymentMethodComponent
        },
        FinalReviewFlex: {
          component: FinalReviewComponent
        },
        OrderConfirmationFlex: {
          component: FsaOrderConfirmationComponent
        },
        DynamicProgressBarStepsComponent: {
          component: FSCheckoutProgressComponent
        }
      }
    })
  ],
  declarations: [
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    FSMiniCartComponent,
    FsPaymentMethodComponent
  ],
  exports: [
    I18nModule,
    PaymentFormModule,
    PaymentMethodModule,
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    FSMiniCartComponent,
    FsPaymentMethodComponent
  ],
  entryComponents: [
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    QuoteReviewComponent,
    FinalReviewComponent,
    FSMiniCartComponent,
    FsPaymentMethodComponent
  ],
  providers: [FSCartService, OccFSCartService, FSCategoryService]
})
export class CheckoutModule { }
