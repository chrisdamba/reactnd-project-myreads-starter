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
        this.performSearch = debounce(300, false, this.performSearch);
      }
    
      handleQueryChange(event) {
        const query = event.target.value;
        this.setState({ query });
        this.performSearch(query);
      }
    
      performSearch(query) {
        if (query === '' || query === undefined){
          this.setState({ results: [] });
          return;
        }
    
        BooksAPI.search(query).then((books) => {
          if (books.constructor === Array) {
            this.setState({ results: books });
          } else {
            this.setState({ results: [] });
          }
        });
      }
    
    render() {
        const { onMove } = this.props
        const { query, results } = this.state
        let message;
    
        if (query === '') {
          message = (
            <h2 style={{ textAlign: 'center' }}>
              Write one or more keywords above to start searching.
            </h2>
          );
        } else if (results.length === 0) {
          message = (
            <h2 style={{ textAlign: 'center' }}>
              No results found. Try different keywords.
            </h2>
          );
        }
    
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={event => this.handleQueryChange(event)}
                />
              </div>
            </div>
            <div className="search-books-results">
              {message}
    
              {results.length > 0 && (
                  <ListBooks books={results} onMove={onMove} />
              )}
            </div>
          </div>
        );
      }
}

export default SearchReads