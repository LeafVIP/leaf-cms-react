import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

import '../Search.css'

class Search extends Component {

    constructor( props ) {
		super( props );
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
		};
    }
	
	handleOnInputChange = (event) => {
		const query = event.target.value;
		this.setState({query: query, loading: true, message: ''});
		console.warn(this.state);
	}

	fetchedSearchResults = (page, query) => {

	}
    
    render() {
		const {query} = this.state;
		return (
			<div className="container">
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={query}
						id="search-input"
						name="query"
						placeholder="Search..."
						onChange={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon"/>
				</label>
				
			</div>
			)
	}
}

export default Search
