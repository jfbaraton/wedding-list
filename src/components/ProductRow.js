import React from 'react';
import './ProductList.css';
//import sampleImage from '/logo192.png';

import { useTranslation, Trans } from "react-i18next";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ProductRow = (props) => {
    const { t, i18n } = useTranslation();

    const [isCompleted, setCompleted] = React.useState(null);

    const buy = (itm) => {
        console.log('buy click '+itm);
        if(!localStorage.getItem('px')) {
            alert('looks like you are using a wrong url. you should see "px=" in the adress');
        } else {
            localStorage.getItem('px');
            confirmAlert({
                title: t('Confirm to submit'),
                message: t('You buy the present by yourself and bring it to Ira and Jeff. (Other contributions for this item will be re-allocated)'),
                buttons: [
                    {
                        label: t('Confirm'),
                        onClick: () => props.buyAction(props.item_id, 1, 'WIP')
                    },
                    {
                        label: t('Cancel'),
                        onClick: () => console.log('Click No'+props)
                    }
                ]
            });
        }
    };

    const pay = (itm) => {
        console.log('Pay click '+itm);

        if(!localStorage.getItem('px')) {
            alert('looks like you are using a wrong url. you should see "px=" in the adress');
        } else {
            localStorage.getItem('px');
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className='custom-ui'>
                    <h1>{t('How much do you want to put?')}</h1>
                    <p>{t('amount')}</p>
                    <input type="number" id={'pay_'+props.item_id+'_amount'} />€
                    <button
                      onClick={($this) => {
                            var amount = $this.target.previousElementSibling.value;
                            props.payAction(props.item_id, amount, 'WIP');
                            onClose();
                        }
                      }
                    >
                      {t('Confirm')}
                    </button>
                    <button onClick={onClose}>{t('Cancel')}</button>
                  </div>
                );
              }
            });
        }
    };

    const renderBuyButton = (props, pay) => {
        if(!props.is_completed && !isCompleted && props.item_id > 1) {
            return <img src={process.env.PUBLIC_URL+'/buy_gift.png'} height="75" alt="I buy the gift and bring it" title={t('I buy the gift and bring it')} onClick={() => buy(props.item_id)} />
        }
        return <div></div>
    }
    const renderPayButton = (props, pay) => {
        if(!props.is_completed && !isCompleted) {
            return <img src={process.env.PUBLIC_URL+'/donate_money.jpg'} height="75" alt="I buy the gift and bring it" title={t('Offer money to help buy this gift')} onClick={()=> pay(props.item_id)}/>
        }
        return <div></div>
    }

    return (
    <div className="row product">
        <div className="col-md-2 product-img-container">
            <img className="col-md-2 product-img" src={process.env.PUBLIC_URL+ (props.item_name ? '/'+props.item_name+'.jpg' : '/logo192.png')} alt={props.item_name || 'gift'}  />
            <div className="product-img-name"><Trans i18nKey={props.item_name || 'blue_tshirt'}>trans</Trans></div>
        </div>
        <div className="col-md-2 product-detail">
            <div className="product-detail-desc"><Trans i18nKey={(props.item_name || 'blue_tshirt')+'_desc'}>trans</Trans></div>
        </div>
        <div className="col-md-2 product-price">
            {props.is_completed || isCompleted ? t('item_completed') : ( (props.contributions ? props.contributions+'€ ' : '0€')+ (props.item_id > 1 ? '/ '+(props.price || '-19.99')+'€' : ''))}
            <div className="col-md-2 product-buttons">
                {renderBuyButton(props, pay)}
                {renderPayButton(props, pay)}
            </div>
        </div>



    </div>
    );
}

export default ProductRow;