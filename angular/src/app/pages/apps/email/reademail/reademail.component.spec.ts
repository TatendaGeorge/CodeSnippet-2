import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReademailComponent } from './reademail.component';

describe('ReademailComponent', () => {
  let component: ReademailComponent;
  let fixture: ComponentFixture<ReademailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReademailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReademailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
