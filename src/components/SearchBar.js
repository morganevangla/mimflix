import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/SearchBar.css';

class SearchBar extends Component {
    state = {
        value: ''
    }

    handleChangeSearch = e => {
        this.setState({value: e.target.value})
    }

    render() {
        const { value } = this.state
        return (
            <div className='searchBar--container'>
                <div className='searchBar'>
                    <input className='searchBar--input'
                        type='text'
                        placeholder='Rechercher un film'
                        value= {value}
                        onChange={this.handleChangeSearch}
                    />
                    <div
                    className='searchBar--submit'
                    onClick={() => this.props.onSearchClick(value)}
                    >
                    <FontAwesome className='searchIcon' name='search' />
                    </div>
                </div>
            </div>
        )
    }
}

export { SearchBar };