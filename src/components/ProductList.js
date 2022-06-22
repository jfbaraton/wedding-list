import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        (this.props.items || []).forEach(
            (oneItem) => {
                oneItem.is_completed = false;
                oneItem.contributions = 0;
            }
        );

        (this.props.contributions || []).forEach(
            (oneContribution) => {
                (this.props.items || []).forEach(
                        (oneItem) => {
                            if(oneItem.id == oneContribution.item_id) {
                                if(oneContribution.type == 'Buy') {
                                    oneItem.is_completed = true;
                                } else {
                                    oneItem.contributions = (oneItem.contributions || 0) + oneContribution.amount;
                                }
                            }
                        }
                )
            }
        );
        return (
            <div className="container main-content">
                {this.props.items.map(item => (
                    <ProductRow
                        price={item.price}
                        item_name={item.name}
                        item_id={item.id}
                        key={item.id}
                        is_completed={item.is_completed || false}
                        contributions={item.contributions || 0}
                        payAction = {this.props.payAction}
                        />
                ))}
            </div>
        );
    }
}

export default ProductList;