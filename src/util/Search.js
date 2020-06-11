import React, {Component} from 'react'
import '../Search.css'
import { useMediaQuery } from '@material-ui/core';

class Search extends Component {

	state = {
		query: '',
		results: {},
		loading: false,
		message: '',
	};

    constructor( props ) {
		super( props );
 
    }

    render() {
		const {query} = this.state;
		const {onSearchUpdate} = this.props;

		const handleInputChange = (event) => {
			const query = event.target.value;
			onSearchUpdate(query);
			this.setState({query: query});
		}
		return (
			<div className="container">
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={query}
						id="search-input"
						name="query"
						placeholder="Search..."
						onChange={handleInputChange}
					/>
					<i className="fa fa-search search-icon"/>
				</label>
				
			</div>
			)
	}
}

export default Search
