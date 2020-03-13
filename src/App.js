import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends React.Component {

  state = {
    users: [], 
    loading: false
  }

  componentDidMount() {
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

  searchUsers = (text) => {
    this.state.users.map(user => {
      if (user.login.includes(text)) {
          console.log(user.login)
      } else {
        console.log("user not found")
      }
    })
  }

render() {

  const { users } =  this.state
  return (
    <div className="App">
      <NavBar title="GitHub" icon='fab fa-github'/>
      <div className="container">
      <Search searchUsers={this.searchUsers} />
       <Users loading= {this.state.loading} users={users} />
      </div>
    
    </div>
    
  );

}

}

export default App;
