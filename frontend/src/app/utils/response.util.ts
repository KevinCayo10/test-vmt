export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: any;
}
export interface ApiResponse<T> {
  data?: T;
  message?: string;
}
