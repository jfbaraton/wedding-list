import './App.css';
import ProductList from './components/ProductList';
import React from "react";

import { useTranslation, Trans } from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();
    const [items, setItems] = React.useState(null);
    const [contributions, setContributions] = React.useState(null);
    const [myContributions, setMyContributions] = React.useState(null);
    const [myName, setMyName] = React.useState(null);
    const [updateTime, setUpdateTime] = React.useState(null);

    const qs = require('qs');

    var px = qs.parse(window.location.search, { ignoreQueryPrefix: true }).px;

    if(!px) {
        px = localStorage.getItem('px');
        console.log('use stored '+px);
    } else {
        localStorage.setItem('px', px);
        console.log('store '+px);
    }

    const changeLanguage = lng => {
        localStorage.setItem('lang', lng);
        i18n.changeLanguage(lng);
    };

    var lang = localStorage.getItem('lang');


    const payAction = (item_id, amount, message) => {
        const payRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                px:localStorage.getItem('px'),
                item_id:item_id,
                amount:amount,
                message:message
            })
        };
        fetch('/pay', payRequestOptions)
        .then(response => response.json())
        .then(data => {
            setUpdateTime(Date.now());
        });
    }

    const buyAction = (item_id, amount, message) => {
        const payRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                px:localStorage.getItem('px'),
                item_id:item_id,
                amount:amount,
                message:message
            })
        };
        fetch('/buy', payRequestOptions)
        .then(response => response.json())
        .then(data => {
            setUpdateTime(Date.now());
        });
    }

    const cancelAction = () => {
        const payRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                px:localStorage.getItem('px')
            })
        };
        fetch('/cancel', payRequestOptions)
        .then(response => response.json())
        .then(data => {
            setUpdateTime(Date.now());
        });
    }

    React.useEffect(() => {
        fetch("/mySettings?px="+px)
            .then((res) => res.json())
            .then((data) => {
                    if(data.mySettings.length) {
                        if(!lang) {
                            changeLanguage(data.mySettings[0].language || 'en');
                        }
                        setMyName(data.mySettings[0].name);
                    }
                }
            );
    }, []);

    React.useEffect(() => {
        fetch("/items")
            .then((res) => res.json())
            .then((data) => setItems(data.items));
    }, []);
    React.useEffect(() => {
        fetch("/contributions")
            .then((res) => res.json())
            .then((data) => setContributions(data.contributions));
    }, [updateTime]);
    React.useEffect(() => {
        fetch("/myContributions?px="+px)
            .then((res) => res.json())
            .then((data) => setMyContributions(data.myContributions));
    }, [updateTime]);


    const renderCancelButton = () => {
        return <img src={process.env.PUBLIC_URL+'/remove.png'} height="15" alt={t('cancel')} title={t('cancel')} onClick={() => cancelAction()} />
    }

    return (
        <div className="App">
            <div className="App-header">
                <header className="App-header-title">
                    <a onClick={() => changeLanguage("en")}>🇬🇧</a>
                    <a onClick={() => changeLanguage("fr")}>🇫🇷</a>
                    <h2>{t("Welcome to List")}</h2>
                    <a onClick={() => changeLanguage("fi")}>🇫🇮</a>
                    <a onClick={() => changeLanguage("ru")}>🇷🇺</a>
                </header>
                <header className="App-header-feedback">
                    {!myName || !myContributions ? "" : (
                        t('your_contribution_0')+
                        t(myName)
                    )}
                    {!myName || !myContributions ? "" : !myContributions.length ? '' : (
                        t('your_contribution_1')+
                        (myContributions[0].type == 'Pay' ? (myContributions[0].amount+'€') : (myContributions[0].gift_count+t('your_contribution_3')))+
                        (myContributions.length == 1 ? '.' : (t('your_contribution_2') + (myContributions[1].type == 'Pay' ? (myContributions[1].amount+'€') : (myContributions[1].gift_count+t('your_contribution_3'))) +'.'))+
                        t('your_contribution_4')
                    )}
                    {!myName || !myContributions ? "" : !myContributions.length ? '' : renderCancelButton()}

                </header>
            </div>
            <ProductList
                items={!items ? [] : items}
                contributions={!contributions ? [] : contributions}
                payAction = {payAction}
                buyAction = {buyAction}
            />
        </div>
    );
}

export default App;
