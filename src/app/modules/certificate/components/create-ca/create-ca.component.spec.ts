import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCAComponent } from './create-ca.component';

describe('CreateCAComponent', () => {
  let component: CreateCAComponent;
  let fixture: ComponentFixture<CreateCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
