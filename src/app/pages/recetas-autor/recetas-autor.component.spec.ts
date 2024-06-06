import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasAutorComponent } from './recetas-autor.component';

describe('RecetasAutorComponent', () => {
  let component: RecetasAutorComponent;
  let fixture: ComponentFixture<RecetasAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetasAutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecetasAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
