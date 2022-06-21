import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
            "To get started, edit <1>src/App.js</1> and save to reload.",
            "Welcome to List": "Welcome Ira and Jeff's wedding list",
            welcome: "Hello <br/> <strong>World</strong>",
            item_completed:'Already gifted ! Super!',
            blue_tshirt:'Blue T-Shirt',
            blue_tshirt_desc:'A dumb Blue T-Shirt. Cuz everybody likes blue',
            baking_robot:'Baking Robot',
            baking_robot_desc:'Robot that saves bunbuns papattes when she bakes',
            printer:'3d Printer',
            printer_desc:'For Ira to print the merch that she models',
            plates_cutlery:'Table set',
            plates_cutlery_desc:'For banquets at home',
            piggy_bank:'Jackpot',
            piggy_bank_desc:'Money for other presents, not listed here',
        }
      },
      fr: {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
            "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
            "Welcome to List": "Bienvenue dans la liste de mariage d'Ira et Jeff",
            welcome: "Allo <br/> <strong>Le Monde</strong>",
            item_completed:'Déjà offert ! Super!',
            blue_tshirt:'T-Shirt bleu',
            blue_tshirt_desc:'un T-Shirt bleu tout bête. Pke le blu c\'est tout beau',
            baking_robot:'Robot Pétrisseur',
            baking_robot_desc:'Robot qui sauve les papattes d\'Ira quand elle pétrit une brioche ou monte des blancs en neige',
            printer:'Imprimante 3d',
            printer_desc:'Pour qu\'Ira puisse vendre les figurines qu\'elle modélise',
            plates_cutlery:'Set de table',
            plates_cutlery_desc:'Pour manger la soupe par grandes tablées',
            piggy_bank:'Tirelire',
            piggy_bank_desc:'Argent de poche pour d\'autres cadeaux',
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
