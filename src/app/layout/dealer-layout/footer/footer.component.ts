import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MakesService } from 'src/app/services/makes.service';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  _date_now: any = null;

  pagination: QueryParamsModel = new QueryParamsModel();
  footer_brands: Observable<any[]> = of([]);
  vehicle_sample: Observable<any[]> = of([]);

  constructor(
    private makeService: MakesService,
    private vehicleService: VehiclesService,
  ) { }

  ngOnInit(): void {

    //initialize pagination per page
    this.pagination.per_page = 6;
    this.getBrands({ page: 1 }, { popular: true });

    //initialize pagination per page
    this.pagination.per_page = 20;
    this.getListings({ page: 1 }, { popular: true });
  }

  /**
     * Populate footer_brands with new data based on the pagination number and page size
     * @param pagination The pagination to select
     * @param filter Filters to add to pagination
     */
  getBrands(pageInfo: any, filter: any = {}) {
    let lookup = {
      url: "make"
    };
    this.pagination.current_page = pageInfo.page;
    this.pagination.filters = filter;
    this.makeService.setLookupParams(lookup);
    this.makeService.queryList(this.pagination).subscribe(pagedData => {
      this.footer_brands = of(pagedData.makeList);
    });

  }
  /**
   * Populate vehicle_sample with new data based on the pagination number and page size
   * @param pagination The pagination to select
   * @param filter Filters to add to pagination
   */
  getListings(pageInfo: any, filter: any = {}) {
    let lookup = {
      url: "car/search"
    };
    this.pagination.current_page = pageInfo.page;
    this.pagination.filters = filter;
    this.vehicleService.setLookupParams(lookup);
    this.vehicleService.queryList(this.pagination).subscribe(pagedData => {
      this.vehicle_sample = of(pagedData.result);
    });

  }


}
