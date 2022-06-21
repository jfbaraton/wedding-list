import React from 'react';
//import sampleImage from '/logo192.png';

import { useTranslation, Trans } from "react-i18next";

const ProductRow = (props) => {
    const { t, i18n } = useTranslation();

    return (
    <div className="row product">
      <div className="col-md-2">
        <img src={process.env.PUBLIC_URL+ (props.item_picture || '/logo192.png')} alt="Sample Image" height="150" />
      </div>
      <div className="col-md-8 product-detail">
        <h4>{props.item_name || 'Blue T-Shirt'}</h4>
        <p>{props.item_description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
      </div>
      <div className="col-md-2 product-price">
        {props.price || '19.99€'}
      </div>
    </div>
    );
}

export default ProductRow;