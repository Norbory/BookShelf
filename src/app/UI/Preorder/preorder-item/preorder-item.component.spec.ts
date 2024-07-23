import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreorderItemComponent } from './preorder-item.component';

describe('PreorderItemComponent', () => {
  let component: PreorderItemComponent;
  let fixture: ComponentFixture<PreorderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreorderItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreorderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
