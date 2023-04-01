import React, { Component } from 'react';
import Recorder from "./Recorder";

export class Audio extends Component {
  static displayName = Audio.name;

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div>
          <Recorder/>
        </div>
    );
  }
}
