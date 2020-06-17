import { Component, Injector, OnInit } from '@angular/core';
import {
  AbstractFormComponent,
  DynamicFormsConfig,
  FormDataService,
  FormDataStorageService,
  YFormData,
  OccValueListService,
} from '@fsa/dynamicforms';
import { LanguageService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { FSProduct } from '../../../occ/occ-models/occ.models';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Component({
  selector: 'cx-fs-button',
  templateUrl: './calculation-button.component.html',
})
export class CalculationButtonComponent extends AbstractFormComponent
  implements OnInit {
  constructor(
    protected fb: FormBuilder,
    protected currentProductService: CurrentProductService,
    protected formDataStorageService: FormDataStorageService,
    protected occValueListService: OccValueListService,
    protected formDataService: FormDataService,
    protected formConfig: DynamicFormsConfig,
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector
  ) {
    super(
      fb,
      formDataService,
      occValueListService,
      formConfig,
      appConfig,
      languageService,
      injector
    );
  }

  subscription = new Subscription();
  pricingData: PricingData = {};

  categoryCode: string;

  ngOnInit() {
    super.ngOnInit();
    this.subscription.add(
      this.currentProductService
        .getProduct()
        .pipe(
          filter(Boolean),
          map(currentProduct => {
            const product = <FSProduct>currentProduct;
            if (product && product.defaultCategory) {
              this.categoryCode = product.defaultCategory.code;
            }
          })
        )
        .subscribe()
    );
  }

  onSubmit() {
    const formDataId = this.formDataStorageService.getFormDataIdByCategory(
      this.categoryCode
    );
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formDataService.submit(formData);
  }
}
