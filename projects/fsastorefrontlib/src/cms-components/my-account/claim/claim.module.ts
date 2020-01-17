import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  SpinnerModule,
  CardModule,
  IconConfig,
  IconResourceType,
} from '@spartacus/storefront';
import { OccClaimAdapter } from '../../../occ/services/claim/occ-claim.adapter';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';
import { ClaimPoliciesComponent } from './claim-policies/claim-policies.component';
import { ClaimsComponent } from './claims/claims.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { ClaimDataService } from '../../../core/my-account/services/claim-data.service';
import { ClaimService } from '../../../core/my-account/services/claim.service';
import { ParseDatePipe } from '../../../shared/util/helpers/parseDate.pipe';
import { ClaimPoliciesGuard } from './guards/claim-policies-guard';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'claims',
      pageLabel: 'my-claims',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'noClaims',
      pageLabel: 'noClaimsPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ClaimPoliciesGuard],
    data: {
      cxRoute: 'claimsPage',
      pageLabel: 'claimsPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    CardModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig | IconConfig>{
      cmsComponents: {
        AccountMyClaimsFlex: {
          component: ClaimsComponent,
        },
        ClaimActivePoliciesFlex: {
          component: ClaimPoliciesComponent,
          guards: [AuthGuard],
        },
        StartClaimComponentFlex: {
          component: CreateClaimComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    ParseDatePipe,
    ClaimsComponent,
    DeleteClaimDialogComponent,
    ClaimPoliciesComponent,
    CreateClaimComponent,
  ],
  exports: [ClaimsComponent, ClaimPoliciesComponent, ParseDatePipe],
  providers: [
    ClaimService,
    ClaimDataService,
    ClaimPoliciesComponent,
    OccClaimAdapter,
  ],
  entryComponents: [
    ClaimsComponent,
    DeleteClaimDialogComponent,
    ClaimPoliciesComponent,
    CreateClaimComponent,
  ],
})
export class ClaimModule { }
