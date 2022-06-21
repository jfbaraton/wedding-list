import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';

import { useTranslation, Trans } from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        //console.log('WORKS!');
    };

    const index = 11;

    return (
        <div className="App">
            <header className="App-header">
                <h2>{t("Welcome to React")}</h2>
                <button onClick={() => changeLanguage("de")}>de</button>
                <button onClick={() => changeLanguage("en")}>en</button>
                <p>
                    <Trans>
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </Trans>
                    <Trans i18nKey="welcome">trans</Trans>
                    <Trans>
                        {index + 1} <a>xxx</a>
                    </Trans>
                </p>
            </header>
            <ProductList />
        </div>
    );
}

export default App;
