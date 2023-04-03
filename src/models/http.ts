export type HttpResponse<T> = {
  data: T;
  success: boolean;
};

export type PaginateData<T> = {
  data: T;
  total: number;
};
