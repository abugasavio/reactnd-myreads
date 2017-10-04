import React, { Component } from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";

class Home extends Component {
  constructor(props) {
    super(props);
    this.moveBook = this.moveBook.bind(this);
  }

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  moveBook(e, book) {
    e.preventDefault();
    let nextBookState = e.target.options[e.target.selectedIndex].value;
    book.shelf = nextBookState;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat(book)
		}));
		BooksAPI.update(book, nextBookState);
  }

  render() {
    const books = this.state.books
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              moveBook={this.moveBook}
              books={books.filter(book => book.shelf === "currentlyReading")}
              title="Currently Reading"
            />
            <Bookshelf
              moveBook={this.moveBook}
              books={books.filter(book => book.shelf === "wantToRead")}
              title="Want to Read"
            />
            <Bookshelf
              moveBook={this.moveBook}
              books={books.filter(book => book.shelf === "read")}
              title="Read"
            />
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
