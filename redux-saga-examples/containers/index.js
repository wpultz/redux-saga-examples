import React from 'react'
import { connect } from 'react-redux'

import { fetchRandomWord, fetchDefinition } from '../actions'

class MainContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchRandomWord()).then(word =>
      dispatch(fetchDefinition(word))
    )
  }


  render() {
    return <h1>Main Container</h1>
  }
}

export default connect(state => state)(MainContainer)
