import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategroyMenuComponent } from './product-categroy-menu.component';

describe('ProductCategroyMenuComponent', () => {
  let component: ProductCategroyMenuComponent;
  let fixture: ComponentFixture<ProductCategroyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategroyMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategroyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
