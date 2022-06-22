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
            //this.setState({ update: Date.now() })
            setUpdateTime(Date.now());
            console.log(updateTime);
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
            /*.then((data) =>
                setState((prevState) => ({
                   contributions: data.contributions
                }))
            );*/
    }, [updateTime]);
    React.useEffect(() => {
        fetch("/myContributions?px="+px)
            .then((res) => res.json())
            .then((data) => setMyContributions(data.myContributions));
            /*.then((data) =>
                setState((prevState) => ({
                   contributions: data.contributions
                }))
            );*/
    }, [updateTime]);


    console.log('your_contribution_0 ',myContributions);
    return (
        <div className="App">
            <header className="App-header">
                <a onClick={() => changeLanguage("en")}>🇬🇧</a>
                <a onClick={() => changeLanguage("fr")}>🇫🇷</a>
                <h2>{t("Welcome to List")}</h2>
                <a onClick={() => changeLanguage("fi")}>🇫🇮</a>
                <a onClick={() => changeLanguage("ru")}>🇷🇺</a>
            </header>
            <p>
                {!myName || !myContributions ? "" : (
                    t('your_contribution_0')+
                    t(myName)
                )}
                {!myName || !myContributions ? "" : !myContributions.length ? '' : (
                    t('your_contribution_1')+
                    (myContributions[0].type == 'Pay' ? (myContributions[0].amount+'€') : (myContributions[0].gift_count+t('your_contribution_3')))+
                    (myContributions.length == 1 ? '.' : (t('your_contribution_2') + (myContributions[1].type == 'Pay' ? (myContributions[1].amount+'€') : (myContributions[1].gift_count+t('your_contribution_3'))) +'.'))
                )}

            </p>
            <ProductList
                items={!items ? [] : items}
                contributions={!contributions ? [] : contributions}
                payAction = {payAction}
                />
            <div display="none">{updateTime}</div>
        </div>
    );
}

export default App;
