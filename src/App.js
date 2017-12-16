import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import ListReads from './components/ListReads'
import SearchReads from './components/SearchReads'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books})) 
  }

  moveBook = (id, shelf) => {
    BooksAPI.update(id, shelf).then(data => {
      const books = this.state.books.map(book => 
        (book.id !== id) ?
          book: 
          {
            ...book,
            shelf
          }
      )
      this.setState({books})
    })
  } 

  render() {
    const { moveBook } = this
    const { books } = this.state
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListReads books={books} onMove={moveBook} />
          )} />
          <Route path='/search'  component={SearchReads} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
