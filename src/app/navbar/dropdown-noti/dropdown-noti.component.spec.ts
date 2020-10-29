import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownNotiComponent } from './dropdown-noti.component';

describe('DropdownNotiComponent', () => {
  let component: DropdownNotiComponent;
  let fixture: ComponentFixture<DropdownNotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownNotiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
