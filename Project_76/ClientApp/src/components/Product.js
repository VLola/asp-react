import React, { Component } from 'react';
import './Product.css';

export class Product extends Component {
  static displayName = Product.name;

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.populateProductData();
  }

  static renderProductsTable(products) {
    return (
      <div className='div__main'>
        {products.map(product =>
            <div key={product.id} className='div__product'>
              <img className='img__product' src={product.image}></img>
              <div className='div__product-title'>{product.title}</div>
              <div className='div__product-text'>{product.description}</div>
            </div>
          )}
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Product.renderProductsTable(this.state.products);

    return (
      <div>
      <h1>Products</h1>
      <p>This component demonstrates fetching data from the server.</p>
      <div>
        {contents}
      </div>
      </div>
    );
  }

  async populateProductData() {
    const response = await fetch('product');
    const data = await response.json();
    this.setState({ products: data, loading: false });
  }
}
