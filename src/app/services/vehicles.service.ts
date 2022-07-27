import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { PagedData } from './utils/models/paged-data';
import { QueryParamsModel } from './utils/query-models/query-params.model';
import { CarQueryResultsModel } from './utils/query-models/query-results.model';
import { Vehicle } from './_models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  lookup_url: string;

  constructor(
    private http: HttpClient,
    //custom api services
    private base_service: BaseService
  ) {
    this.lookup_url = "";
  }

  // LIST =>  GET: get list of cars from the server
  public queryList(queryParams: QueryParamsModel): Observable<PagedData<Vehicle>> {
    let params = this.base_service.prepareQueryParametersListing(queryParams);
    return this.http.get<CarQueryResultsModel>(this.lookup_url + "?" + params.toString());
  }

  // LIST =>  GET: get car by ID from the server
  getRecordById(recordId: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.lookup_url + `/${recordId}`);
  }

  public getRecordSearch(queryParams: any): Observable<any> {
    let params = this.base_service.prepareQueryParametersListing(queryParams);
    return this.http.get<any>(this.lookup_url + "?" + params.toString());
  }

  public setLookupParams(params: any) {
    this.lookup_url = "https://api.staging.myautochek.com/v1/inventory/" + params.url;
  }

}
