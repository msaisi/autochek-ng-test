import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle } from 'src/app/services/_models/vehicle';
import { Utils as _utils } from 'src/app/services/utils/utils';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  pagination: QueryParamsModel = new QueryParamsModel();
  records_listing: [Observable<Vehicle[]>] = [of([])];
  data_array: Vehicle[] = [];

  //set background image for header
  _listing_bg_image: string = "";

  constructor(
    private vehicleService: VehiclesService,
  ) {
    this._listing_bg_image = "assets/images/listing-bg.jpg";
  }

  ngOnInit(): void {
    //initialize pagination per page
    this.pagination.per_page = 15;
    this.getListings({ page: 1 }, {});
  }

  /**
   * Populate records_listing with new data based on the pagination number and page size
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
      this.pagination.total_count = pagedData.pagination.total;

      let payload_total = _utils.calculatePagesCount(this.pagination.per_page, pagedData.pagination.total);

      if (this.pagination.page_count != payload_total) {
        this.pagination.page_count = payload_total;
      }

      //for pagination items
      this.data_array = pagedData.result;

      //load formatted data for UI display
      this.records_listing = _utils.chunk_vehicle_data(3, pagedData.result);

    });

  }

  handlePageChange(event: any): void {
    this.getListings({ page: event });
  }

}
