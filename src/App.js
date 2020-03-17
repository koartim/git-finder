import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';

class App extends React.Component {

  state = {
    users: [], 
    loading: false
  }

  async componentDidMount() {
    fetch(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then(rsp => rsp.json())
    .then(data => {
      this.setState({
        users: data,
        loading: false
      })
    })
  }

  searchUsers = async text => {
    this.setState({loading: true})
    const rsp = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({users: rsp.data.items, loading: false})

  }

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    })
  }

render() {
  const { loading, users } = this.state
  return (
    <div className="App">
      <NavBar title="GitHub" icon='fab fa-github'/>
      <div className="container">
      <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} />
       <Users loading= {loading} users={users} />
      </div>
    </div>
    
  );

}

}

export default App;
