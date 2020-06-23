export * from './action';

export interface BackEndResponse<T> {
    status: string;
    data: T;
}
