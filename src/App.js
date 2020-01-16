import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'marco-wong-1',
      lists: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.fetchRepo();
  }

  fetchRepo() {
    fetch(`https://api.github.com/users/${this.state.username}/repos`)
    .then(response => response.json())
    .then(result => result.map(repo => (
      {
        repoName: `${repo.name}`
      }
    )))
    .then(repoN => this.setState({
      lists: repoN // set the lists to the fetched list of repo names
    }))
    .catch(error => this.setState({
      lists: [] // set the lists to empty if there is an error fetching
    }))
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.fetchRepo();
  }

  render() {
    return(
      <div className="App">
        <div className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input type="text" value={this.state.username} onChange={this.handleChange} />
            </label>
          </form>
        </div>
        <div className="listing">
          { 
            this.state.lists.length > 0 ? 
            this.state.lists.map(name => {
              return <p key={name.repoName}>{name.repoName}</p>
            }) :
            <h1> Found No Repository </h1>
          }
        </div>
      </div>
    )
  }
}

export default App;
