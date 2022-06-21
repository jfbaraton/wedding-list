import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container main-content">
        <ProductRow price='10€' item_picture='baking_robot.jpg' item_name='baking_robot'/>
        <ProductRow />
      </div>
    );
  }
}

export default ProductList;