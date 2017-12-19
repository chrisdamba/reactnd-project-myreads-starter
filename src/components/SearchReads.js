import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce';
import ListBooks from './ListBooks'
import * as BooksAPI from './../BooksAPI'

class SearchReads extends Component {
    static propTypes = {
        onMove: PropTypes.func.isRequired
    }

    state = {
        results: [],
        query: ''
      };
    
      constructor() {
        super();
        this.search = debounce(500, false, this.search);
      }
    
      onQueryChange(query) {
        this.setState({ query });
        this.search(query);
      }
    
      search(query) {
        if (query === '' || query === undefined){
          this.setState({ results: [] });
          return;
        }
    
        BooksAPI.search(query).then((books) => {
          if (books.constructor === Array) {
        	const results = books.map(book => ({...book, shelf: 'none'}))
            this.setState({ results });
          } else {
            this.setState({ results: [] });
          }
        });
      }
    
    render() {
        const { onMove } = this.props
        const { query, results } = this.state
    
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={evt => this.onQueryChange(evt.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              { results.length === 0 && query !== '' && (
                 <h2 style={{ textAlign: 'center' }}>
                  Your search did not return any matches. Try different keywords.
                 </h2>
              )}
    
              {results.length > 0 && (
                  <ListBooks books={results} onMove={onMove} />
              )}
            </div>
          </div>
        );
      }
}

export default SearchReads