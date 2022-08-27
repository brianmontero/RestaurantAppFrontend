import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesDesignComponent } from './favorites-design.component';

describe('FavoritesDesignComponent', () => {
  let component: FavoritesDesignComponent;
  let fixture: ComponentFixture<FavoritesDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
