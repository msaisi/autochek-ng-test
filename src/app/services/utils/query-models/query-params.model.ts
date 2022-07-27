export class QueryParamsModel {
  // fields
  // The number of elements in the page
  per_page: number = 100;
  // The total number of elements
  total_count: number = 0;
  // The total number of pages
  page_count: number = 0;
  // The current page number
  current_page: number = 0;
  //sort
  sort: any = { dir: "", prop: "" };
  //filters
  filters: any = {};
  //API service lookup
  lookup: any = {};

  // constructor overrides
  constructor(
    _lookup: any = {},
    _filters: any = {},
    _sort: any = { dir: "", prop: "" },
    _current_page: number = 0,
    _per_page: number = 100,
    _total_count: number = 0,
    _page_count: number = 0) {

    this.lookup = _lookup;
    this.filters = _filters;
    this.per_page = _per_page;
    this.total_count = _total_count;
    this.page_count = _page_count;
    this.current_page = _current_page;
    this.sort = _sort;
  }
}
