import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReadPageComponent } from './book-read-page.component';

describe('BookReadPageComponent', () => {
  let component: BookReadPageComponent;
  let fixture: ComponentFixture<BookReadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
