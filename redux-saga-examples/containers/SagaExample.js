import React from 'react'
import { connect } from 'react-redux'

class MainContainer extends React.Component {
  constructor() {
    super();

    this.handleFetchWord = ::this.handleFetchWord;
    this.handleFetchDefinition = ::this.handleFetchDefinition;
    this.handleFetchWordAndDefinition = ::this.handleFetchWordAndDefinition;
    this.handleRepetitiveFetch = ::this.handleRepetitiveFetch;
    this.handleStopRepetitiveFetch = ::this.handleStopRepetitiveFetch;
  }


  handleFetchWord() {
    this.props.dispatch({ type: 'FETCH_RANDOM_WORD' })
  }


  handleFetchDefinition() {
    this.props.dispatch({ type: 'FETCH_WORD_DEFINITION', payload: this.props.word.get('word') })
  }


  handleFetchWordAndDefinition() {
    this.props.dispatch({ type: 'FETCH_WORD_AND_DEFINITION' })
  }


  handleRepetitiveFetch() {
    this.props.dispatch({ type: 'START_FETCHING' })
  }


  handleStopRepetitiveFetch() {
    this.props.dispatch({ type: 'STOP_FETCHING' })
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

        <div>Voodoo stuff</div>
        <button onClick={ this.handleRepetitiveFetch }>Will it ever stop?</button>
        <button onClick={ this.handleStopRepetitiveFetch }>Yes, it will</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  word: state.word,
  definition: state.definition
})

export default connect(mapStateToProps)(MainContainer)
