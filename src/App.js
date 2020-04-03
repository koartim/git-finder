import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About'
import Disclaimer from './components/pages/Disclaimer';
import { FETCH_USERS } from './actions';
import { connect } from 'react-redux';

class App extends React.Component {

  state = {
    users: [], 
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  async componentDidMount() {
   await fetch(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then(rsp => rsp.json())
    .then(data => this.props.fetchUsers(data))
    this.setState({loading: false})
  }

  searchUsers = async text => {
    this.setState({loading: true})
    const rsp = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({users: rsp.data.items, loading: false})

  }

  getUser = async username => {
    this.setState({loading: true})
    const rsp = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({user: rsp.data, loading: false})
  }

  getUserRepos = async username => {
    this.setState({loading: true})
   await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then(rsp => rsp.json())
    .then(data => {
      this.setState({
        repos: data,
        loading: false
      })
    })
    .catch(console.error()
    )
  }

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({alert: null}), 3000)
  }

render() {

  const { loading, user, repos } = this.state

  return (
    <div className="App">
      <NavBar title="GitHub" icon='fab fa-github'/>
      <div className="container">
      <Alert alert={this.state.alert}/>
      <Switch>
        <Route exact path="/" render={props => (
          <Fragment>
            <Search 
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers} 
              showClear={this.props.users.length > 0 ? true : false}
              setAlert={this.setAlert}
           />
       <Users loading= {loading} users={this.props.users} />
          </Fragment>
        )}
        />
        <Route exact path='/about' component={About} />
        <Route exact path='/disclaimer' render={Disclaimer} />  
        <Route exact path='/user/:login' render={routeProps => 
        <User {...routeProps} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} 
        loading={loading}/>} />
      </Switch>
      </div>
    </div>
  );
 }
}

const mapStateToProps = (state) => {
  console.log(state.users);
  return {
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (users) => {
      dispatch({type: FETCH_USERS, payload: users})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
