import './App.css';
import ProductList from './components/ProductList';
import React from "react";

import { useTranslation, Trans } from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();
    const [items, setItems] = React.useState(null);
    const [contributions, setContributions] = React.useState(null);
    //const {items, contributions} = this.state || {};
    React.useEffect(() => {
        fetch("/items")
            .then((res) => res.json())
            .then((data) => setItems(data.items));
            /*.then((data) =>
                setState((prevState) => ({
                   items: data.items
                }))
            );*/
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
    }, []);

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        //console.log('WORKS!');
    };

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
                {!items ? "Loading..." : JSON.stringify(contributions)}
            </p>
            <ProductList items={!items ? [] : items} contributions={!contributions ? [] : contributions}/>
        </div>
    );
}

export default App;
