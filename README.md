# React Promise HOC
React HOC for easy promise handling.

## Installation
`yarn add react-promise-hoc`

## Usage
```javascript
import React from 'react'
import {compose} from 'recompose'
import promiseHoc from 'react-promise-hoc'

const Post = ({ isLoading, post }) => (
  <div>
    <h1>{post.title}</h1>
    <h1>{post.content}</h1>
  </div>
)

// the regular way
export default promiseHoc((props) => ({
  post: axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
}))(Post)

// also possible to provide an array
// notice: this will provide a prop called data which will be an array of the resolved data
export default promiseHoc((props) => ([
  axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
]))(Post)

// with recompose
const enhance = compose(
  promiseHoc((props) => ({
    post: axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
  }))
)

export default enhance(Post)
```

## Documentation
### Injected props to child component
| Props     | Type    | Description                                                  |
|-----------|---------|--------------------------------------------------------------|
| isLoading | boolean | Set to true when promise(s) are pending and false when done. |
| data      | array   | If array is passed this will be set to the resolved data     |
| err       | object  | The error object if one ore more promises got rejected.      |