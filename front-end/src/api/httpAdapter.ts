import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import ApiError from './apiError'

export interface HttpParams {
  [name: string]: any
}

export interface HttpInterface {

  get<T = any>(path: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<T>

  delete<T = any>(path: string, config?: AxiosRequestConfig): Promise<T>

  post<T = any>(path: string, data?: HttpParams, config?: AxiosRequestConfig): Promise<T>

  put<T = any>(path: string, data?: HttpParams, config?: AxiosRequestConfig): Promise<T>

  patch<T = any>(path: string, data?: HttpParams, config?: AxiosRequestConfig): Promise<T>
}

export default class HttpAdapter implements HttpInterface {
  constructor(protected axiosInstance: AxiosInstance) {
    this.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      'Cache-Control': 'no-cache, no-store'
    };
  }

  get axios() {
    return this.axiosInstance
  }
  delete<T = any>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.processResponse(this.axios.delete<T>(path, config), path)
  }

  get<T = any>(path: string, params?: HttpParams, config?: AxiosRequestConfig): Promise<T> {
    return this.processResponse(this.axios.get<T>(path, {...config, params}), path)
  }

  patch<T = any>(path: string, data?: HttpParams, config?: AxiosRequestConfig): Promise<T> {
    return this.processResponse(this.axios.patch<T>(path, data, config), path)
  }

  post<T = any>(path: string, data?: HttpParams, config?: AxiosRequestConfig): Promise<T> {
    return this.processResponse(this.axios.post<T>(path, data, config), path)
  }

  put<T = any>(path: string, data?: HttpParams, config?: AxiosRequestConfig): Promise<T> {
    return this.processResponse(this.axios.put<T>(path, data, config), path)
  }

  protected async processResponse<T>(promise: Promise<AxiosResponse<T>>, path: string): Promise<T> {
    try {
      const {data} = await promise
      return data
    } catch (e) {
      throw new ApiError<T>(e, path)
    }
  }

}