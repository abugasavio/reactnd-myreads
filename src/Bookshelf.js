import React from 'react';
import Book from './Book';

const Bookshelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book, index) => (
          <li key={index}>
            <Book book={book} moveBook={props.moveBook} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default Bookshelf;
