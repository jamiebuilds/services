import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default class BooksService extends React.Component {
  static async getInitialProps({query}) {
    let response = await axios.get('http://localhost:4000/books');
    let book = response.data.books.find(b => b.id === Number(query.id));
    return { book: book };
  }

  render() {
    return (
      <div>
        <h1>{this.props.book.title}</h1>
        <p>{this.props.book.author} ({this.props.book.year})</p>
        <p>{this.props.book.description}</p>
        <img src={this.props.book.img}/>
      </div>
    );
  }
}
