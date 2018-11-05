export interface InjectedPromiseHocProps<D = any, E = any> {
  isLoading: boolean,
  refetch: () => Promise<any>,
  data?: D[],
  err?: E,
}

export type CallbackFn = (err: any, data: any, props: any) => void
export type PromiseFunction = (props: any) => { [key: string]: Promise<any> } | Promise<any>[]