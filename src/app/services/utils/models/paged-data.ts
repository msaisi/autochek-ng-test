import { ListPagination } from './pagination';

/**
 * An array of data with an associated page object used for paging
 */
export class PagedMake<T> {
  makeList = new Array<T>();
  pagination = new ListPagination();
}

/**
 * An array of data with an associated page object used for paging
 */
export class PagedData<T> {
  result = new Array<T>();
  pagination = new ListPagination();
}
