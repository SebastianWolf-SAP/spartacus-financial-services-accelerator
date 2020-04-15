import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { TextAreaComponent } from './text-area.component';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
  @Input() errorWrapperClass;
  @Input() errorClass;
  @Input() errorMessageClass;
}

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'textarea',
  name: 'testTextArea',
  label: 'What time did it happen?',
};

const mockFormGroup = new FormGroup({
  testTextArea: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    components: {
      textarea: {
        component: TextAreaComponent,
      },
    },
  },
};

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.type).toEqual('textarea');
  });

  it('should render textarea component', () => {
    const TextAreaComponent = el.query(By.css('textarea')).nativeElement;
    expect(TextAreaComponent).toBeTruthy();
  });
});
