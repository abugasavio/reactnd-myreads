import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Home extends Component {
	constructor(props) {
    super(props);
    this.moveBook = this.moveBook.bind(this);
	}

  state = {
		books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  moveBook(e, book) {
    e.preventDefault();
    let nextBookState = e.target.options[e.target.selectedIndex].value;
    book.shelf = nextBookState;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat(book)
    }));
  }

  render() {
    const books = this.state.books;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book, index) => {
                    if (book.shelf === "currentlyReading") {
                      return (
                        <li key={index}>
                          <Book book={book} moveBook={this.moveBook}/>
                        </li>
                      );
                    }
                  })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book, index) => {
                    if (book.shelf === "wantToRead") {
                      return (
                        <li key={index}>
                          <Book book={book} moveBook={this.moveBook} />
                        </li>
                      );
                    }
                  })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book, index) => {
                    if (book.shelf === "read") {
                      return (
                        <li key={index}>
                          <Book book={book} moveBook={this.moveBook} />
                        </li>
                      );
                    }
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;
