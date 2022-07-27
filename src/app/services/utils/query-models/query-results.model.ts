export class MakeQueryResultsModel {
  // fields
  makeList: any[];
  pagination: any;

  constructor(_data: any[] = [], _pagination: any = []) {
    this.makeList = _data;
    this.pagination = _pagination;
  }
}

export class CarQueryResultsModel {
  // fields
  result: any[];
  pagination: any;

  constructor(_data: any[] = [], _pagination: any = []) {
    this.result = _data;
    this.pagination = _pagination;
  }
}
