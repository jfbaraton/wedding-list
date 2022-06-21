import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

        //<ProductRow price='10€' item_picture='baking_robot.jpg' item_name='baking_robot'/>
        //<ProductRow />
  render() {
    return (
      <div className="container main-content">

        {this.props.items.map(item => (
            <ProductRow price={item.price+'€'} item_name={item.name} id={item.id}/>
        ))}
      </div>
    );
  }
}

export default ProductList;