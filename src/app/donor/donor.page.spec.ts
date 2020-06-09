import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonorPage } from './donor.page';

describe('DonorPage', () => {
  let component: DonorPage;
  let fixture: ComponentFixture<DonorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
