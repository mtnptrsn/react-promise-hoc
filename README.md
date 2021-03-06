# React Promise HOC
React HOC for easy promise handling.

## Installation
`yarn add react-promise-hoc` or `npm i react-promise-hoc`

## Usage
```javascript
import React, { SFC } from 'react'
import promiseHoc, { InjectedPromiseHocProps } from 'react-promise-hoc'

const Post: SFC<InjectedPromiseHocProps> = ({ isLoading, post, refetch }) =>
  isLoading
    ? <p>Loading...</p>
    : (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <button onClick={refetch}>Refetch</button>
      </div>
    )

export default promiseHoc((props) => ({
  post: axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
}), (err, data, props) => { /* gets invoked when promise ir rejected / resolved */ })(Post)

// also possible to provide an array
// notice: this will provide a prop called data which will be an array of the resolved data
export default promiseHoc((props) => ([
  axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
]))(Post)
```

## Documentation
### Injected props to child component
| Props     | Type     | Description                                                             |
|-----------|----------|-------------------------------------------------------------------------|
| isLoading | boolean  | Set to true when promise(s) are pending and false when done.            |
| data      | array    | If an array is passed this will be set to the resolved data as an array |
| err       | object   | The error object if one ore more promises got rejected.                 |
| refetch   | function | When called the promises will reinvoke                                  |