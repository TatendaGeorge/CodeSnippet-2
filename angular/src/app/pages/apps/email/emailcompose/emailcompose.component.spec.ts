import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmailcomposeComponent } from './emailcompose.component';

describe('EmailcomposeComponent', () => {
  let component: EmailcomposeComponent;
  let fixture: ComponentFixture<EmailcomposeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailcomposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailcomposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
