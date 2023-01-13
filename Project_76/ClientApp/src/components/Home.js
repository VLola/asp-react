import React, { Component } from 'react';
import './Home.css';
import { Product } from "./Product";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { products: [], search: "", loading: true };
    this.changeSearch = this.changeSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.populateProductData();
  }

  changeSearch(event) {
    this.setState({search: event.target.value});
  }

  async search(){
    const response = await fetch('product/Find?text=' + this.state.search);
    const data = await response.json();
    this.setState({ products: data, loading: false });
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
          <label htmlFor="search">Search:</label>
          <input name='search' value={this.state.search} onChange={this.changeSearch}></input>
          <button onClick={this.search}>Find</button>
        </div>
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
