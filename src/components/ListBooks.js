import React from 'react'
import Book from "./Book";

const ListBooks = ({ books, bookshelfCssClass, onMove=f=>f }) => {
    return (
        <div className={bookshelfCssClass}>
            <ol className="books-grid">
                { books.length > 0 && (
                    books.map(book => <Book key={book.id} {...book} onMove={(shelf) => onMove(book.id, shelf)} />)   
                )}
            </ol>
        </div>
   )
}

export default ListBooks