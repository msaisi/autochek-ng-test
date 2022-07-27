import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MakesService } from 'src/app/services/makes.service';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';
import { Make } from 'src/app/services/_models/make';
import { Utils as _utils } from 'src/app/services/utils/utils';
import { VehiclesService } from '../../../services/vehicles.service';
import { Vehicle } from 'src/app/services/_models/vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagination: QueryParamsModel = new QueryParamsModel();
  records_popular: [Observable<Make[]>] = [of([])];
  records_slider: Observable<Vehicle[]> = of([]);

  total_records: number = 0;

  showcase_records = [];
  _showcase_section_section: any = null;

  constructor(
    private makeService: MakesService,
    private vehicleService: VehiclesService
  ) { }

  ngOnInit(): void {

    //initialize pagination per page
    this.pagination.per_page = 50;
    this.getMakes({ page: 1 }, { popular: true });

    //initialize pagination per page
    this.pagination.per_page = 4;
    this.getListings({ page: 1 }, {});

    this._showcase_section_section = {
      background: "assets/images/listing-bg.jpg",
      item_1: "assets/images/honda-back.webp",
      item_2: "assets/images/toyota-front.webp"
    }

  }


  /**
   * Populate records_popular with new data based on the pagination number and page size
   * @param pagination The pagination to select
   * @param filter Filters to add to pagination
   */
  getMakes(pageInfo: any, filter: any = {}) {
    let lookup = {
      url: "make"
    };

    this.pagination.current_page = pageInfo.page;
    this.pagination.filters = filter;

    this.makeService.setLookupParams(lookup);
    this.makeService.queryList(this.pagination).subscribe(pagedData => {
      this.pagination.total_count = pagedData.pagination.total;

      let payload_total = _utils.calculatePagesCount(this.pagination.per_page, pagedData.pagination.total);

      if (this.pagination.page_count != payload_total) {
        this.pagination.page_count = payload_total;
      }
      //load formatted data for UI display
      this.records_popular = _utils.chunk_make_data(3, pagedData.makeList);

    });

  }

  /**
   * Populate records_slider with new data based on the pagination number and page size
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
      this.records_slider = of(pagedData.result);

    });
  }

}
