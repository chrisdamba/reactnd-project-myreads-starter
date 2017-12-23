import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import SweetAlert from 'sweetalert-react'
import NoMatch from './NoMatch'
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
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
        
        this.showAlert(book, shelf)
      })
    }
    /*
    BooksAPI.update(book, shelf)
      .then(() => this.getBooks())
      .then(() => {
		const bookFound = this.state.books.filter(b => b.id === book.id).length > 0
        this.showAlert(book, shelf)
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
      */
  } 

  render() {
    const { moveBook } = this
    const { books } = this.state
    return (
      <BrowserRouter>
        <div className="app">
			<Switch>
				<Route exact path='/' render={() => (
            		<ListReads books={books} onMove={moveBook} />
          		)} />
          		<Route path='/search'  render={() => (
            		<SearchReads onMove={moveBook} />
          		)} />
				<Route component={NoMatch}/>
      		</Switch>
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
