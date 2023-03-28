import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCAComponent } from './list-ca.component';

describe('ListCAComponent', () => {
  let component: ListCAComponent;
  let fixture: ComponentFixture<ListCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
