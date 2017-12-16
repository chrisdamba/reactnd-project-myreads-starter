import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import ListReads from './components/ListReads'
import SearchReads from './components/SearchReads'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' component={ListReads} />
          <Route path='/search'  component={SearchReads} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
