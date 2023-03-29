import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenuUser } from './NavMenuUser';

export class LayoutUser extends Component {
  static displayName = LayoutUser.name;

  render() {
    return (
      <div className='vh-100'>
        <NavMenuUser/>
        <Container className='h-75'>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
