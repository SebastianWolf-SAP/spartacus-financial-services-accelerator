import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ChangeSimulationComponent } from './change-simulation.component';
import createSpy = jasmine.createSpy;

const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    categoryCode: {
      code: 'testCategory',
    },
  },
};

const configurationSteps = [
  {
    code: 'step1',
  },
];
const mockChangeId = '00000000';

class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
  submitChangeRequest = createSpy();
}

class MockUserRequestNavigationService {
  getConfigurationSteps() {
    return configurationSteps;
  }
  getActiveStep() {}
}

class MockRoutingService {
  go = createSpy();
}

class GlobalMessageServiceMock {}

describe('ChangeSimulationComponent', () => {
  let component: ChangeSimulationComponent;
  let fixture: ComponentFixture<ChangeSimulationComponent>;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;
  let mockChangeRequestService: MockChangeRequestService;
  let mockRoutingService: MockRoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
        {
          provide: UserRequestNavigationService,
          useClass: MockUserRequestNavigationService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            routeConfig: {
              path: 'testPath',
            },
          },
        },
      ],
      declarations: [ChangeSimulationComponent],
    }).compileComponents();
    mockUserRequestNavigationService = TestBed.get(
      UserRequestNavigationService as Type<UserRequestNavigationService>
    );
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    globalMessageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    mockChangeRequestService = TestBed.get(ChangeRequestService as Type<
      ChangeRequestService
    >);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call submitChangeRequest and redirect to homepage', () => {
    component.submitChangeRequest(mockChangeId);
    expect(mockChangeRequestService.submitChangeRequest).toHaveBeenCalledWith(
      mockChangeId
    );
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: '/',
    });
  });
});
