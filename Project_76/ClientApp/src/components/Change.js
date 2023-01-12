import React, { Component } from 'react';
import './Home.css';
import { Product } from "./Product";

export class Change extends Component {
  static displayName = Change.name;

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.populateChangeData();
  }

  static renderChangesTable(products) {
    return (
      <div className='div__main'>
        {products.map(product =>
          <Product key={product.id} product={product} change={true}/>
          )}
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Change.renderChangesTable(this.state.products);

    return (
      <div>
      <h1>Changes</h1>
      <div>
        {contents}
      </div>
      </div>
    );
  }

  async populateChangeData() {
    const response = await fetch('product');
    const data = await response.json();
    this.setState({ products: data, loading: false });
  }
}
