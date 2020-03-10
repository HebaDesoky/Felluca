import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateBoatsComponent } from './add-or-update-boats.component';

describe('AddOrUpdateBoatsComponent', () => {
  let component: AddOrUpdateBoatsComponent;
  let fixture: ComponentFixture<AddOrUpdateBoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateBoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
