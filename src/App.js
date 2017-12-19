import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import SweetAlert from 'sweetalert-react'
import ListReads from './components/ListReads'
import SearchReads from './components/SearchReads'
import * as BooksAPI from './BooksAPI'
import './App.css'
import './../node_modules/sweetalert/dist/sweetalert.css'

const shelfMapper = {
   	currentlyReading: 'Currently Reading',
	wantToRead: 'Want to Read',
	read: 'Read',
  	none: 'None'
}

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      moved: false,
      currentShelf: '',
      title: ''
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

  showAlert(book, shelf) {
    if (shelf !== 'none') {
      this.setState({
          moved: true, 
          currentShelf: `Moved to ${shelfMapper[shelf]} shelf.`,
          title: book.title
      })
    }
  }

  getBooks() {
    BooksAPI.getAll()
      .then(books => this.setState({books}))
      .catch(() => { alert('Something went wrong with your request.') })
  }

  moveBook = (book, shelf) => {
    if (shelf === 'none') return    
    BooksAPI.update(book, shelf)
      .then(() => this.getBooks())
      .then(() => {
		const bookFound = this.state.books.filter(b => b.id === book.id).length > 0
        if (!bookFound) {
          this.addBook(book)
        } else {
          const books = this.state.books.map(b => 
            (b.id !== book.id) ?
              b: 
              {
                ...b,
                shelf
              }
          )
          this.setState({books})
        }      	
      })
    .then(() => this.showAlert(book, shelf))
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
          <SweetAlert
            show={this.state.moved}
            title={this.state.title}
            text={this.state.currentShelf}
            onConfirm={() => this.setState({ moved: false, currentShelf: '', title: '' })}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
