import React, { Component } from 'react';
import './Home.css';
import { Product } from "./Product";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.populateProductData();
  }

  static renderProductsTable(products) {
    return (
      <div className='div__products'>
        {products.map(product =>
          <Product key={product.id} product={product} change={false}/>
          )}
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Home.renderProductsTable(this.state.products);

    return (
      <div>
      <h1>Products</h1>
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
