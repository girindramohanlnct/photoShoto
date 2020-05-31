import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorReportComponent } from './contributor-report.component';

describe('ContributorReportComponent', () => {
  let component: ContributorReportComponent;
  let fixture: ComponentFixture<ContributorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
