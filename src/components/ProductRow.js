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
        <h4><Trans i18nKey={props.item_name || 'blue_tshirt'}>trans</Trans></h4>
        <p><Trans i18nKey={(props.item_name || 'blue_tshirt')+'_desc'}>trans</Trans></p>
      </div>
      <div className="col-md-2 product-price">
        {props.price || '19.99€'}
      </div>
    </div>
    );
}

export default ProductRow;