export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export interface HttpResponse<T = unknown> {
  success: boolean;
  data: T;
  errorCode: number;
  errorMessage: string;
}

export interface PageResponse<T> {
  list: T[];
  current: number;
  pageSize: number;
  total: number;
}

// export interface FiberResponse<T> {
//   success: boolean;
//   data: T;
//   errorCode: number;
//   errorMessage: string;
// }
