export interface IObject {
  [key: string]: any;
}

export interface IObjectGeneric<T> {
  [key: string]: T;
}

export interface IBaseStoreState<T> {
  data: T;
  loading: boolean;
  error: string;
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IPaginationParams {
  page: number;
  perpage: number;
}

export interface IPagination {
  hasPrevious: boolean;
  prevPage: number;
  hasNext: boolean;
  next: number;
  currentPage: number;
  pageSize: number;
  lastPage: number;
  total: number;
}
