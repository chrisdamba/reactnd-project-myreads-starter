import React from 'react'
import Book from "./Book";

const ListBooks = ({ books }) => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => 
                    <Book key={book.id} {...book} />)
                }
            </ol>
        </div>
   )
}

export default ListBooks