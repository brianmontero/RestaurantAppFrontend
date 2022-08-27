import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDesignComponent } from './history-design.component';

describe('HistoryDesignComponent', () => {
  let component: HistoryDesignComponent;
  let fixture: ComponentFixture<HistoryDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
