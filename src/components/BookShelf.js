import React from 'react'
import ListBooks from './ListBooks'

const BookShelf = ({ title, books }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <ListBooks books={books}/>
        </div>
    )
}

export default BookShelf