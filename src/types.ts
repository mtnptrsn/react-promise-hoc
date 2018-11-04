export interface InjectedPromiseHocProps<D = any, E = any> {
  isLoading: boolean,
  refetch: () => Promise<any>,
  data?: D[],
  err?: E,
}