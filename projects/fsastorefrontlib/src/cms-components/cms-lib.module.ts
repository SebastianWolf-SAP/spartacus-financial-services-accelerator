import { NgModule } from '@angular/core';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product/product-feature/product-feature.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CategoryFormsModule } from './form/cms-category-form-component/cms-category-forms.module';
import { CustomContainerModule } from './container/cms-custom-container.module';
import { AgentModule } from './agent/agent.module';
import { MyAccountModule } from './myaccount/myaccount.module';
import { effects } from '../core/myaccount/store/effects/index';
import {
  reducerProvider,
  reducerToken,
} from '../core/myaccount/store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserRequestModule } from './user-request/user.request.module';
import { CategoryFeatureModule } from './category/category-feature/category-feature.module';
import { CategoryFeatureCarouselModule } from './category/category-feature-carousel/category-feature-carousel.module';

@NgModule({
  imports: [
    AgentModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
    MyAccountModule,
    UserRequestModule,
    StoreModule.forFeature('assets', reducerToken),
    EffectsModule.forFeature(effects),
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
  ],
  exports: [
    AgentModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
    MyAccountModule,
    UserRequestModule,
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
  ],
  providers: [reducerProvider],
})
export class CmsLibModule {}
