import React, { Component } from 'react'
import { PromiseFunction } from './types';
import { arrayToMap } from './utils';

const promiseHoc = (promiseFn: PromiseFunction) =>
  (WrappedComponent: React.ComponentType<any>) => class PromiseHoc extends Component {
    state = {
      isLoading: true,
      err: null,
      resolvedPromiseData: {},
    }

    componentDidMount() {
      this.fetch()
    }

    fetch = () => {
      if (!this.state.isLoading)
        this.setState({ isLoading: true })

      const promiseFnReturn = promiseFn(this.props)

      const promises = Array.isArray(promiseFnReturn)
        ? promiseFnReturn as Promise<any>[]
        : Object.keys(promiseFnReturn).map((key) => promiseFnReturn[key])

      const keys = Array.isArray(promiseFnReturn) ? null : Object.keys(promiseFnReturn)

      return Promise.all(promises)
        .then(this.onPromiseResolved(keys))
        .catch(this.onPromiseRejected)
    }

    onPromiseResolved = (keys: string[] | null) => (result: any[] | any) => {
      const resolvedPromiseData = keys ? arrayToMap(keys, result) : null

      this.setState({
        ...(resolvedPromiseData ? { resolvedPromiseData } : { data: result }),
        isLoading: false,
      })
    }

    onPromiseRejected = (err: any) =>
      this.setState({ err, isLoading: false, })

    render() {
      const { resolvedPromiseData, ...state } = this.state
      return (
        <WrappedComponent
          {...this.props}
          {...state}
          {...resolvedPromiseData}
          refetch={this.fetch}
        />
      )
    }
  }

export default promiseHoc