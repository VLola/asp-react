import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className='h-75 d-flex flex-column justify-content-center align-items-center'>
        <h1 className="m-3">Welcome to the site:</h1>
        <h2 className="m-3">"Where? How? Why?"</h2>
      </div>
    );
  }
}
