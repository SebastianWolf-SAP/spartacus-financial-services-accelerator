import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRootComponent } from './agent-root/agent-root.component';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { FindAgentNavigationComponent } from './find-agent-navigation/find-agent-navigation.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import {
  MediaModule,
  StoreFinderModule,
  ListNavigationModule,
  IconModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { AgentSearchBoxComponent } from './agent-search-box/agent-search-box.component';
import { AgentSearchListComponent } from './agent-search-list/agent-search-list.component';
import { AgentSearchDetailsComponent } from './agent-search-details/agent-search-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentConnector } from '../../core/agent/connectors';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    MediaModule,
    I18nModule,
    IconModule,
    RouterModule,
    StoreFinderModule,
    ReactiveFormsModule,
    ListNavigationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSAgentRootComponent: {
          component: AgentRootComponent,
        },
        FindAgentNavigationTypeFlex: {
          component: FindAgentNavigationComponent,
        },
        AgentSearchBoxFlex: {
          component: AgentSearchBoxComponent,
        },
        AgentSearchListFlex: {
          component: AgentSearchListComponent,
        },
        AgentSearchDetailsFlex: {
          component: AgentSearchDetailsComponent,
        },
      },
    }),
  ],
  declarations: [
    AgentRootComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AgentSearchDetailsComponent,
  ],
  exports: [
    AgentRootComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AgentSearchDetailsComponent,
  ],
  entryComponents: [
    AgentRootComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AgentSearchDetailsComponent,
  ],
  providers: [AgentConnector],
})
export class AgentModule {}
