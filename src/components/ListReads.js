import React, { Component } from 'react';
import BookShelf from './BookShelf';

const ListReads = ({ books, onMove=f=>f }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf title="Currently Reading" onMove={onMove} books={books.filter(book => book.shelf==='currentlyReading')} />
          <BookShelf title="Want to Read" onMove={onMove} books={books.filter(book => book.shelf==='wantToRead')} />
          <BookShelf title="Read" onMove={onMove} books={books.filter(book => book.shelf==='read')} />
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  )
}

export default ListReads;