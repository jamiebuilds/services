import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default class Services extends React.Component {
  static async getInitialProps() {
    let response = await axios.get('http://localhost:3000/api/availability');
    return { services: response.data.services };
  }

  render() {
    return (
      <div>
        <h1>Services</h1>
        <ul>
          {this.props.services.map((service) =>
            <li key={service.id}>
              <Link href={service.path}>{service.name}</Link>
              {' '}
              ({ service.online ? 'Online' : 'Offline' })
            </li>
          )}
        </ul>
      </div>
    );
  }
}
