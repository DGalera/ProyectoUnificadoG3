import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablonRespuestasPage } from './tablon-respuestas.page';

describe('TablonRespuestasPage', () => {
  let component: TablonRespuestasPage;
  let fixture: ComponentFixture<TablonRespuestasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablonRespuestasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablonRespuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
