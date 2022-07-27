import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListingDetailsComponent } from './listing-details.component';

describe('ListingDetailsComponent', () => {
  let component: ListingDetailsComponent;
  let fixture: ComponentFixture<ListingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ListingDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component that will render car details', () => {
    expect(component).toBeTruthy();
  });

  it('should render car details wrapper section', () => {
    fixture = TestBed.createComponent(ListingDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.listing-single-wrapper')).toBeTruthy();
  });
  it('should render car media section', () => {
    fixture = TestBed.createComponent(ListingDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.listing-single-wrapper .media-section')).toBeTruthy();
  });
  it('should render car single details section', () => {
    fixture = TestBed.createComponent(ListingDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.listing-single-wrapper .listing-single-details')).toBeTruthy();
  });
});
