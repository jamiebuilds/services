import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default class BooksService extends React.Component {
  static async getInitialProps() {
    let response = await axios.get('http://localhost:4000/books');
    return { books: response.data.books };
  }

  render() {
    return (
      <div>
        <h1>Books</h1>
        <ul>
          {this.props.books.map(book =>
            <li key={book.id}>
              <Link href={`/books/view?id=${book.id}`}>{book.title}</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
