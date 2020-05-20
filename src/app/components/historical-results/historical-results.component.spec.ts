import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalResultsComponent } from './historical-results.component';

describe('HistoricalResultsComponent', () => {
  let component: HistoricalResultsComponent;
  let fixture: ComponentFixture<HistoricalResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
