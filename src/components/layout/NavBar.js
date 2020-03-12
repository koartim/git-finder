import React from 'react';
import PropTypes from 'prop-types';

const NavBar = (props) => {

    const { icon, title } = props

        return(
            <nav className="navbar bg-primary">
                <h1>
                    <i className= {icon}></i> {title} Finder
                </h1>
            </nav>
        )
}

NavBar.defaultProps = {
    title: "Github Finder",
    icon: 'fab fa-github'
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default NavBar;