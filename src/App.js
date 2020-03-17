import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About'
import Disclaimer from './components/pages/Disclaimer';

class App extends React.Component {

  state = {
    users: [], 
    loading: false,
    alert: null
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

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({alert: null}), 3000)
  }

render() {
  const { loading, users } = this.state
  return (
    <Router>
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
              showClear={users.length > 0 ? true : false}
              setAlert={this.setAlert}
           />
       <Users loading= {loading} users={users} />
          </Fragment>
        )}
        />
        <Route exact path='/about' component={About} />
        <Route exact path='/disclaimer' render={routeProps => <Disclaimer {...routeProps} />} />  
      </Switch>
      </div>
    </div>
    </Router>
    
  );
 }
}

export default App;
