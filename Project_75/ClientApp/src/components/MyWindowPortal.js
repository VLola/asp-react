import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class MyWindowPortal extends React.Component {
  constructor(props) {
    super(props);
    // Step 1: create a container <div>
    this.containeEl = document.createElement('div');
    this.externalWindow = null;
    
  }

  render() {
    // Step 2: append props.children to the container <div> that isn't mounted yet
    return ReactDOM.createPortal(this.props.children, this.containeEl);
  }

  componentDidMount() {
    // Step 3: open a new browser window and store a reference to it
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    // Step 4: append the container <div> (that has props.chi.dren append to it) to 
    // the body of the new MyWindowPortal
    this.externalWindow.document.body.appendChild(this.containeEl);
  }

  componentWillUnmount() {
    // Step 5: This will fire when this.state.showWindowPortal in the parent componentDidMount
    // become false. So we tidy up by closing the window
    
    this.externalWindow.close();
  }
}