import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBarComponent } from './course-bar.component';

describe('CourseBarComponent', () => {
  let component: CourseBarComponent;
  let fixture: ComponentFixture<CourseBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
