import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasEtapaComponent } from './recetas-etapa.component';

describe('RecetasEtapaComponent', () => {
  let component: RecetasEtapaComponent;
  let fixture: ComponentFixture<RecetasEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetasEtapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecetasEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
