import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FSRegisterComponent } from './fs-register.component';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { RoutingConfig, UserService, GlobalMessageService, Title, UserToken, AuthService, I18nTestingModule, RoutesConfig } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { PipeTransform, Pipe } from '@angular/core';
import { Store } from '@ngrx/store';

describe('FSRegisterComponent', () => {
  let component: FSRegisterComponent;
  let fixture: ComponentFixture<FSRegisterComponent>;

  class MockStore {
  }
  class MockRoutingConfig {
    routing: { routes: RoutesConfig } = {
      routes: {
        page1: { paths: ['path1', 'path10'] },
      },
    };
  }
  class MockUserService {
    getTitles(): Observable<Title[]> {
      return of([]);
  }}
  class MockGlobalMessageService {
    remove() {}
    get() {
      return of();
    }
  }
  class MockAuthService {
    getUserToken(): Observable<UserToken> {
      return of({ access_token: 'test' } as UserToken);
    }
  }
  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule
      ],
      providers: [
         { provide: Store, useClass: MockStore },
         { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: UserService, useClass: MockUserService},
        { provide: GlobalMessageService, useClass: MockGlobalMessageService},
        { provide: AuthService, useClass: MockAuthService},
      ],
      declarations: [ FSRegisterComponent, MockUrlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
