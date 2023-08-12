import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteQuotesPageComponent } from './favourite-quotes-page.component';

describe('FavouriteQuotesPageComponent', () => {
  let component: FavouriteQuotesPageComponent;
  let fixture: ComponentFixture<FavouriteQuotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteQuotesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteQuotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
