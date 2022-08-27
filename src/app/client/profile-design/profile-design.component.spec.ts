import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDesignComponent } from './profile-design.component';

describe('ProfileDesignComponent', () => {
  let component: ProfileDesignComponent;
  let fixture: ComponentFixture<ProfileDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
