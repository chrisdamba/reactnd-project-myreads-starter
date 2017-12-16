import React from 'react';

const Book = ({ title, authors, imageLinks, shelf, onMove=f=>f }) => {
    return (
        <li>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                <select onChange={(e)=> {onMove(e.target.value)}}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value={shelf}>None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
            </div>
        </li>
    )
}

export default Book;