import React, { Component } from 'react';
import './Change.css';

export class Product extends Component {
  static displayName = Product.name;

  constructor(props) {
    super(props);
    this.state = { id: props.product.id, title: props.product.title, description: props.product.description, image: props.product.image};
    this.changeImage = this.changeImage.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
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

  save(){
    alert(this.state.id);
  }

  delete(){
    alert(this.state.id);
  }

  render() {
    return(
            <div className='div__product'>
              <label htmlFor="image">Image:</label>
              <textarea className='textarea__product' name='image' value={this.state.image} onChange={this.changeImage}></textarea>
              <label htmlFor="title">Title:</label>
              <textarea className='textarea__product' name='title' value={this.state.title} onChange={this.changeTitle}></textarea>
              <label htmlFor="description">Description:</label>
              <textarea className='textarea__product' name='description' value={this.state.description} onChange={this.changeDescription}></textarea>
              <div>
                <button onClick={this.save} className='button__product'>Save</button>
                <button className='button__product'>Delete</button>
              </div>
            </div>
    );
  }
}
