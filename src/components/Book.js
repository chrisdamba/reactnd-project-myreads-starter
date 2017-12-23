import React from 'react';

const Book = ({ id, title, authors, imageLinks, shelf, onMove=f=>f }) => {
  const thumbnail = (imageLinks && 'thumbnail' in imageLinks) ? imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'
  return (
        <li key={id}>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                <select value={shelf} onChange={(e)=> {onMove(e.target.value)}}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors ? authors.join(', ') : ''}</div>
            </div>
        </li>
    )
}

export default Book;