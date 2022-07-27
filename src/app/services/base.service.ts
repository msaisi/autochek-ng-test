import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) {
  }

  // build query parameters
  prepareQueryParameters(payload: any = []) {

    let params = new HttpParams();

    if (Object.entries(payload).length > 0) {
      for (let key in payload) {
        if (!payload.hasOwnProperty(key)) {
          continue;
        }
        params = params.set(key, payload[key]);
      }
    }
    return params;
  }

  prepareQueryParametersListing(payload: any = []) {
    let params = new HttpParams();

    if (Object.entries(payload).length > 0) {
      for (let key in payload) {
        if (!payload.hasOwnProperty(key)) {
          continue;
        }

        switch (key) {
          case "filters":
            let sub_row_obj = payload[key];
            if (Object.entries(sub_row_obj).length > 0) {
              for (let sub_key in sub_row_obj) {
                if (typeof sub_row_obj[sub_key] === "boolean") {
                  params = params.set(sub_key, sub_row_obj[sub_key]);
                } else if (sub_row_obj[sub_key]) {
                  params = params.set(sub_key, sub_row_obj[sub_key]);
                }
              }
            }
            break;
          case "current_page":
            // code...
            params = params.set('page', payload[key]);
            break;
          case "per_page":
            // code...
            params = params.set('pageSize', payload[key]);
            break;
          case "sort":
            // code...
            if (payload[key].prop && payload[key].dir) {
              let sort_str = payload[key]?.prop + "," + payload[key]?.dir;
              params = params.set('sort', sort_str);
            }

            break;
          default:
            // code...
            break;
        }
      }
    }
    return params;
  }

  removeEmptyObjects(obj: any = {}) {
    let finalObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        const nestedObj = this.removeEmptyObjects(obj[key]);
        if (Object.keys(nestedObj).length) {
          finalObj[key] = nestedObj;
        }
      } else if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
        finalObj[key] = obj[key];
      }
    });
    return finalObj;
  }

}
