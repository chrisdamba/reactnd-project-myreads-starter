import Book from "./Book";

const ListBooks = ({ books }) => {
    return (
        <ol className="books-grid">
            {books.map(book => <Book key={book.id} {...book} />)}
        </ol>
    )
}

export default ListBooks