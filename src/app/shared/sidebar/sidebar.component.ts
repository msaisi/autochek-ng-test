import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MakesService } from 'src/app/services/makes.service';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  pagination: QueryParamsModel = new QueryParamsModel();
  search_brands: Observable<any[]> = of([]);
  top_selling: Observable<any[]> = of([]);
  _currency: string = "Kes ";

  constructor(
    private makeService: MakesService,
    private vehicleService: VehiclesService,
  ) { }

  ngOnInit(): void {

    //initialize pagination per page
    this.pagination.per_page = 24;
    this.getBrands({ page: 1 }, { popular: true });

    //initialize pagination per page
    this.pagination.per_page = 5;
    this.getListings({ page: 1 }, {});
  }


  /**
   * Populate search_brands with new data based on the pagination number and page size
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
      this.search_brands = of(pagedData.makeList);
    });

  }
  /**
   * Populate top_selling with new data based on the pagination number and page size
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
      this.top_selling = of(pagedData.result);
    });

  }

}
