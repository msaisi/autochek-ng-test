

import { Observable, of } from 'rxjs';
import { Vehicle } from 'src/app/services/_models/vehicle';
import { Make } from '../_models/make';

export class Utils {

  static calculatePagesCount(pageSize: number, totalCount: number): number {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
  }

  static chunk_make_data(chunkSize: number = 3, data_array: Make[] = []) {
    let records_popular: [Observable<Make[]>] = [of([])];

    //remove first row initialization
    records_popular.pop();

    for (let i = 0; i < data_array.length; i += chunkSize) {
      const chunk = data_array.slice(i, i + chunkSize);
      records_popular.push(of(chunk));
    }
    return records_popular;
  }


  static chunk_vehicle_data(chunkSize: number = 3, data_array: Vehicle[] = []) {
    let records_popular: [Observable<Vehicle[]>] = [of([])];

    //remove first row initialization
    records_popular.pop();

    for (let i = 0; i < data_array.length; i += chunkSize) {
      const chunk = data_array.slice(i, i + chunkSize);
      records_popular.push(of(chunk));
    }
    return records_popular;
  }
}
