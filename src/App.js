import React, { Component } from 'react';
import ShowAutocomplete from './Components/ShowAutocomplete';
import Graph from './Components/Graph'
import Loadable from 'react-loading-overlay'
const states = {
  LOADING: 'loading',
  DEFAULT: null
}

export default class App extends Component {
  state = {
    state: states.DEFAULT,
    show: null,
    title: null
  }

  render() {
    return (
      <Loadable
        active={this.state.state === states.LOADING && !!this.state.title}
        spinner
        text={`Looking for ${this.state.title}`}>
        <main><label htmlFor="show-autocomplete">Search for a TV show</label>
          <ShowAutocomplete
            id="show-autocomplete"
            onChange={(show) => this.setState({show, state: states.DEFAULT})}
            onLoading={(value) => this.setState({ state: states.LOADING, title: value ? value:this.state.title })}
          />
          <Graph data={this.state.show} title={this.state.title} />
          </main>
          <footer>
            <span>by <a href="https://cedmax.com" target="_blank" rel="noopener noreferrer">cedmax</a> </span>
            <span>data from <a href="https://trakt.tv/" target="_blank" rel="noopener noreferrer">trakt.tv</a></span>
          </footer>
      </Loadable>
    )
  }
}