import React from 'react'
import Book from "./Book";

const ListBooks = ({ books, onMove=f=>f }) => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => 
                    <Book key={book.id} {...book} onMove={(shelf) => onMove(book.id, shelf)} />)
                }
            </ol>
        </div>
   )
}

export default ListBooks