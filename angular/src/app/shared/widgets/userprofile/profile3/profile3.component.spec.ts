import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Profile3Component } from './profile3.component';

describe('Profile3Component', () => {
  let component: Profile3Component;
  let fixture: ComponentFixture<Profile3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Profile3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Profile3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
