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
    this.getBooks()
  }

  addBook = (book) => {
    const books = [
      ...this.state.books,
      book
    ]
    this.setState({books})
  } 

  getBooks() {
    BooksAPI.getAll()
      .then(books => this.setState({books}))
      .catch(() => { alert('Something went wrong with your request.') })
  }

  moveBook = (id, shelf) => {
    BooksAPI.update(id, shelf)
      .then(() => this.getBooks())
      .then(() => {
        const bookFound = this.state.books.filter(book => book.id === id).length > 0
        if (bookFound) {
          BooksAPI.get(id).then(this.addBook)
        } else {
          const books = this.state.books.map(book => 
            (book.id !== id) ?
              book: 
              {
                ...book,
                shelf
              }
          )
          this.setState({books})
        }  
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
          <Route path='/search'  render={() => (
            <SearchReads onMove={moveBook} />
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
