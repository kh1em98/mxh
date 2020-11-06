import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIdentityComponent } from './post-identity.component';

describe('PostIdentityComponent', () => {
  let component: PostIdentityComponent;
  let fixture: ComponentFixture<PostIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
