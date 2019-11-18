import { FormDataService } from './../../../../../dynamicforms/src/core/services/data/form-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDefinition } from '@fsa/dynamicforms';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CMSFormSubmitComponent } from '../../../occ/occ-models';
import { FormSampleConfigurations } from './form-sample-configurations';

@Component({
  selector: 'fsa-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit-component.html',
})
export class CmsCategoryFormSubmitComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected formDataService: FormDataService
  ) {}

  routeParamId = 'formCode';
  pageContext: PageContext;
  formConfig: FormDefinition;
  component$: Observable<CMSFormSubmitComponent>;
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          switchMap(routeParam => {
            this.pageContext = new PageContext(
              routeParam[this.routeParamId],
              PageType.CATEGORY_PAGE
            );
            return (this.component$ = this.cmsComponentConnector.get(
              this.componentData.uid,
              this.pageContext
            ));
          }),
          switchMap(componentData => {
            if (componentData && componentData.formId) {
              this.formConfig = FormSampleConfigurations.sampleConfigurations.filter(
                item => item.formId === componentData.formId
              )[0];
            }
            if (!this.formConfig) {
              return this.formDataService.getFormDefinition(
                componentData.applicationId,
                componentData.formId
              );
            }
          }),
          map(formDefinition => {
            if (formDefinition && formDefinition.content) {
              this.formConfig = <FormDefinition>(
                JSON.parse(formDefinition.content)
              );
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
