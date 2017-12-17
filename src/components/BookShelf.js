import React from 'react'
import ListBooks from './ListBooks'

const BookShelf = ({ title, books, onMove=f=>f }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <ListBooks books={books} bookshelfCssClass="bookshelf-books" onMove={onMove} />
        </div>
    )
}

export default BookShelf