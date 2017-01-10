import React from 'react'
import { connect } from 'react-redux'

import { fetchRandomWord, fetchDefinition, fetchRandomWordPlus } from '../thunks/definitions'

class MainContainer extends React.Component {
  constructor() {
    super();

    this.handleFetchWord = ::this.handleFetchWord;
    this.handleFetchDefinition = ::this.handleFetchDefinition;
    this.handleFetchWordAndDefinition = ::this.handleFetchWordAndDefinition;
  }


  handleFetchWord() {
    this.props.fetchRandomWord();
  }


  handleFetchDefinition() {
    const { word, fetchDefinition } = this.props;

    if (word.get('word')) {
      fetchDefinition(word.get('word'));
    }
  }


  handleFetchWordAndDefinition() {
    const { fetchRandomWord, fetchDefinition } = this.props;

    // chaining thunks in this fashion isn't the worst thing ever
    fetchRandomWord().then(word => {
      console.log(word)
      fetchDefinition(word)
    })
  }


  render() {
    const { word, definition } = this.props;

    const wordVal = word.get('word')

    const wordContent = word.get('error')
      ? <div style={{ color: 'red' }}>unable to fetch random word</div>
      : <div>Word: { wordVal }</div>

    const definitionContent = definition.get('error')
      ? <div style={{ color: 'red' }}>unable to find definition for { wordVal }</div>
      : <div>Definition: { definition.get('definition') }</div>

    return (
      <div>
        <h1>Let's Try Sagas!</h1>
        <div>
          <h2>Generate Word</h2>
          <button onClick={ this.handleFetchWord }>fetch word</button>
          { wordContent }
        </div>
        <div>
          <h2>Fetch Definition</h2>
          <button onClick={ this.handleFetchDefinition }>fetch definition for { wordVal }</button>
          { definitionContent }
        </div>
        <div>
          <h2>Generate Word and Fetch Definition</h2>
          <button onClick={ this.handleFetchWordAndDefinition }>fetch word and defintion</button>
          { wordContent }
          { definitionContent }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  word: state.word,
  definition: state.definition
})
const dispatchableActions = {
  fetchRandomWord,
  fetchDefinition,
  fetchRandomWordPlus
}

export default connect(mapStateToProps, dispatchableActions)(MainContainer)
