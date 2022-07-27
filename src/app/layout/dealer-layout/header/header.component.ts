import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MakesService } from 'src/app/services/makes.service';
import { QueryParamsModel } from 'src/app/services/utils/query-models/query-params.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pagination: QueryParamsModel = new QueryParamsModel();
  _makes: Observable<any[]> = of([]);

  constructor(
    private makeService: MakesService
  ) {
  }

  ngOnInit() {

    //initialize pagination page size
    this.pagination.per_page = 24;
    this.getBrands({ page: 1 }, { popular: true });

  }

  /**
   * Populate _makes with new data based on the pagination number and page size
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
      this._makes = of(pagedData.makeList);
    });

  }


}
