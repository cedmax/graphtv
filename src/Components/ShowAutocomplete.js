import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const formatItem = (item) => `${item.title} - ${item.year}`

class App extends Component {
  fetchList = async (query) => {
    const { data } = await axios.get(`/api/search/${query}`);
    this.setState({ list: data })
  }
  
  fetchShow = async ({id}) => {
    this.props.onLoading(this.state.value)
    const { data } = await axios.get(`/api/show/${id}`);
    this.props.onChange(data)
  }

  state = {
    value: '',
    list: []
  }

  requestTimer = null

  render() {
    const { id } = this.props;
    const {value, list} = this.state;

    return (
      <Autosuggest
        inputProps={{ 
          id, 
          value, 
          placeholder: 'Breaking Bad', 
          onChange: (e) => this.setState({ value: e.target.value }) 
        }}
        suggestions={list}
        onSuggestionsClearRequested={() => this.setState({list: []})}
        getSuggestionValue={(item) => item.title}
        onSuggestionSelected={(event, { suggestion }) => {
          this.setState({ value: formatItem(suggestion), list: [ suggestion ] }, () => this.fetchShow(suggestion))
        }}
        onSuggestionsFetchRequested={({value}) => {
          clearTimeout(this.requestTimer)
          if (value) {
            this.requestTimer = setTimeout(() => this.fetchList(value), 400)
          }
        }}
        renderSuggestion={(item) => formatItem(item)}
      />
    )
  }
}

export default App;
