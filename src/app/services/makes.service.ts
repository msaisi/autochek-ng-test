import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { PagedMake } from './utils/models/paged-data';
import { QueryParamsModel } from './utils/query-models/query-params.model';
import { MakeQueryResultsModel } from './utils/query-models/query-results.model';
import { Make } from './_models/make';

@Injectable({
  providedIn: 'root'
})
export class MakesService {

  lookup_url: string;

  constructor(
    private http: HttpClient,
    //custom api services
    private base_service: BaseService
  ) {
    this.lookup_url = "";
  }

  // LIST =>  GET: get list of makes from the server
  public queryList(queryParams: QueryParamsModel): Observable<PagedMake<Make>> {
    let params = this.base_service.prepareQueryParametersListing(queryParams);
    return this.http.get<MakeQueryResultsModel>(this.lookup_url + "?" + params.toString());
  }

  getRecordById(recordId: string): Observable<Make> {
    return this.http.get<Make>(this.lookup_url + `/${recordId}`);
  }

  public setLookupParams(params: any) {
    this.lookup_url = "https://api.staging.myautochek.com/v1/inventory/" + params.url;
  }

}
