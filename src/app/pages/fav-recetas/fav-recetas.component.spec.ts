import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRecetasComponent } from './fav-recetas.component';

describe('FavRecetasComponent', () => {
  let component: FavRecetasComponent;
  let fixture: ComponentFixture<FavRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavRecetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
