import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColaborarPage } from './colaborar.page';

describe('ColaborarPage', () => {
  let component: ColaborarPage;
  let fixture: ComponentFixture<ColaborarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaborarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColaborarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
