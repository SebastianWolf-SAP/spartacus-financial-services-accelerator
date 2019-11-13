import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from '../../../occ/occ-models/cms-component.models';
import { InboxService } from '../../../core/my-account/services/inbox.service';
import { Message } from 'projects/fsastorefrontlib/src/core/my-account/services/inbox-data.service';

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    protected cdr: ChangeDetectorRef
  ) { }

  subscription = new Subscription();
  component$: Observable<CmsInboxComponent>;
  initialTab$: Observable<CmsInboxTabComponent>;
  tabs;
  mobileGroupTitle: string;
  activeMessageGroup: string;
  activeTabIndex = 0;
  initialGroupName: string;
  shouldShow = false;
  messagesCollection: Message[] = [];

  // To be used in the next Inbox task
  readState = this.inboxService.readStatus;
  mainCheckboxChecked;
  subjectSortOrder = 'desc';
  contentSortOrder = 'desc';
  sentSortOrder = 'desc';

  ngOnInit() {
    this.subscription.add(
      this.componentData.data$.subscribe(
        data => (this.tabs = data.tabComponents.split(' '))
      )
    );
    this.initialTab$ = this.cmsService.getComponentData(this.tabs[0]); // taking the first tab as initial/active on component load

    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle
        .pipe(
          mergeMap(currentTitle =>
            this.initialTab$.pipe(
              map(initial => {
                this.mobileGroupTitle =
                  currentTitle && currentTitle.title
                    ? currentTitle.title
                    : initial.title;
                this.initialGroupName = initial.messageGroup;
              })
            )
          )
        )
        .subscribe()
    );
  }

  checkAllCheckboxes() {
    this.mainCheckboxChecked = !this.mainCheckboxChecked;
    this.inboxService.checkAllMessagesSource.next(this.mainCheckboxChecked);
  }

  changeMessagesReadState() {
    const messagesUidList = this.inboxService.getUidsFromMessagesCollection();
    const read = this.inboxService.getMessagesAction();
    this.inboxService.setMessagesState(messagesUidList, read).subscribe();
  }

  sortMessages(sortCode, sortOrder) {
    this.inboxService.activeMessageGroupAndTitle.subscribe(groupTitle => {
      let group;
      if (groupTitle == null) {
        group = this.initialGroupName;
      }
      else {
        group = groupTitle.messageGroup;
      }
      this.inboxService.sortMessages(sortCode, sortOrder, group).subscribe(sortedMessages => this.inboxService.messagesSource.next(sortedMessages))
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
