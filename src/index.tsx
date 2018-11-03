import React, { Component } from 'react'
import { arrayToMap } from './utils';

const reactFetch = (promiseFn: (props: any) => { [key: string]: Promise<any> } | Promise<any>[]) =>
  (WrappedComponent: React.ComponentType<any>) => class ReactFetch extends Component {
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

      Promise.all(promises)
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

export default reactFetch