import React, { Component } from 'react';
import './Add.css';

export class Add extends Component {
  static displayName = Add.name;

  constructor(props) {
    super(props);
    this.state = { title: "", description: "", image: ""};
    this.changeImage = this.changeImage.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  changeTitle(event) {
    this.setState({title: event.target.value});
  }

  changeImage(event) {
    this.setState({image: event.target.value});
  }

  changeDescription(event) {
    this.setState({description: event.target.value});
  }

  render() {
    return(
      <div className='div__add'>
        <label className='label__add' htmlFor="image">Image:</label>
        <textarea name='image' value={this.state.image} onChange={this.changeImage}></textarea>
        <label className='label__add' htmlFor="title">Title:</label>
        <textarea name='title' value={this.state.title} onChange={this.changeTitle}></textarea>
        <label className='label__add' htmlFor="description">Description:</label>
        <textarea name='description' value={this.state.description} onChange={this.changeDescription}></textarea>
        <button className='button__add' onClick={this.addProduct}>Add</button>
      </div>
    );
  }

  addProduct(){
    const data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 0,
      title: this.state.title,
      description: this.state.description,
      image: this.state.image
      })
    };
    fetch('product/Add', data);
  }
}
