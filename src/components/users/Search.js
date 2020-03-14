import React from 'react';

class Search extends React.Component {

    state = {
        text: ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.searchUsers(this.state.text)
        this.setState({
            text: ''
        })
    }
 

    render() {
        console.log(this.props.searchUsers)
        return(
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users" value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" value='Search'/>
                </form>
            </div>
        )
    }
}

export default Search