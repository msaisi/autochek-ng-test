import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      declarations: [ListingComponent],
      //providers: [NgxPaginationModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component that render show paginated car listing', () => {
    expect(component).toBeTruthy();
  });


  it('should render car list section', () => {
    fixture = TestBed.createComponent(ListingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.wrapper .car-list-section')).toBeTruthy();
  });
  it('should render car pagination section', () => {
    fixture = TestBed.createComponent(ListingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.wrapper .page-navigation-wrapper')).toBeTruthy();
  });
  it('should render sidebar section', () => {
    fixture = TestBed.createComponent(ListingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.side-bar')).toBeTruthy();
  });
});
