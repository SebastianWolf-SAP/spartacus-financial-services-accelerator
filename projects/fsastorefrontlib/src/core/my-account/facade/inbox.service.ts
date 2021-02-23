import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InboxDataService, InboxTab } from '../services/inbox-data.service';
import { InboxConnector } from '../connectors/inbox.connector';
import { startWith } from 'rxjs/operators';

export const GHOST_DATA = { values: new Array(5) };

@Injectable()
export class InboxService {
  constructor(
    protected inboxData: InboxDataService,
    protected adapter: InboxConnector
  ) {}

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  messagesSource = new BehaviorSubject<boolean>(false);
  messages = this.messagesSource.asObservable();

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  getMessages(messageGroup, searchConfig: SearchConfig): Observable<any> {
    return this.adapter
      .getSiteMessagesForUserAndGroup(
        this.inboxData.userId,
        messageGroup,
        searchConfig
      )
      .pipe(startWith(GHOST_DATA));
  }

  setMessagesState(uidList, read): Observable<any> {
    return this.adapter.setMessagesState(this.inboxData.userId, uidList, read);
  }
}
