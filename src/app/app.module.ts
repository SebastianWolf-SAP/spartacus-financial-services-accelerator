import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FSAStorefrontModule } from '@fsa/storefront';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
      server: {
        baseUrl: 'https://financialservices.dev-ded1-2.yrd.rot.hybris.com:9002'
      },
      site: {
        baseSite: 'insurance'
      },
      cmsComponentMapping: {
        EnrichedResponsiveBannerComponent: 'fsa-enriched-responsive-banner'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
