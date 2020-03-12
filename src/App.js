import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';

class App extends React.Component {


  state = {
    users: []
  }

  componentDidMount() {
    fetch('https://api.github.com/users')
    .then(rsp => rsp.json())
    .then(data => {
      this.setState({
        users: data
      })
    })
  }

render() {
console.log(this.state.users)
const { users } =  this.state
  return (
    <div className="App">
      <NavBar title="GitHub" icon='fab fa-github'/>
      <div className="container">
       <Users users={users} />
      </div>
    
    </div>
    
  );


  }


}

export default App;
