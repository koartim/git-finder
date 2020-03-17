import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {

    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        // if the user attempts to submit an empty search
        if (this.state.text === '') {
            // we call the alert function passed down from app which accepts a message and a type
            this.props.setAlert('Please enter something', 'light')
        } else {
            // if the form is submitted with appropriate text, we simply call searchUsers
            this.props.searchUsers(this.state.text)
        this.setState({
            text: ''
        })
        }
        
    }


 

    render() {
        const {showClear, clearUsers} = this.props
        return(
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users" value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                {showClear && (
                   <button class="btn btn-light btn-block" onClick={clearUsers}>Clear</button>     
                )}
                
            </div>
        )
    }
}

export default Search