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
            your_contribution_0:'Hi ',
            your_contribution_1:'. Your personal contribution is ',
            your_contribution_2:' and ',
            your_contribution_3:' gift',
            your_contribution_4:'  To Cancel your last contribution, click here.',
            cancel:'Cancel my latest contribution',
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


            'Port-des-Barques':'Pascale and Jean-Yves',
            'Manu':'Manu',
            'Huittinen':'Päälicheff perhe',
            'Bordeaux': 'Audrey, Aurore, Serena and Sylvain',
            'Imatra':'Imatra\'s Malyukovs',
            'Uppsala':'wanker',
            'Örnsköldsvik':'Rooobin',
            'Eerikilaiset':'Jessica and Niklas',
            'Ben':'Ben',
            'Kori perhe':'Kori perhe',
            'Köpenhamn':'Tom',
            'Sat':'Sat\'',
            'Kumpula':'Anu and Jouko',
            'Paula':'Paula',
            'Minna':'Minna',
            'Cape Town':'Lise, Francisco and Noah',

        }
      },
      fr: {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
            "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
            "Welcome to List": "Bienvenue dans la liste de mariage d'Ira et Jeff",
            welcome: "Allo <br/> <strong>Le Monde</strong>",
            item_completed:'Déjà offert ! Super!',
            your_contribution_0:'Bonjour ',
            your_contribution_1:'. Votre contribution personnelle est de ',
            your_contribution_2:' et ',
            your_contribution_3:' cadeau',
            your_contribution_4:' Pour annuler votre dernière contribution, cliquez ici.',
            cancel:'Annuler ta dernière contribution',
            blue_tshirt:'T-Shirt bleu',
            blue_tshirt_desc:'un T-Shirt bleu tout bête. Pke le bleu c\'est tout beau',
            baking_robot:'Robot Pétrisseur',
            baking_robot_desc:'Robot qui sauve les papattes d\'Ira quand elle pétrit une brioche ou monte des blancs en neige',
            printer:'Imprimante 3d',
            printer_desc:'Pour qu\'Ira puisse vendre les figurines qu\'elle modélise',
            plates_cutlery:'Set de table',
            plates_cutlery_desc:'Pour manger la soupe par grandes tablées',
            piggy_bank:'Tirelire',
            piggy_bank_desc:'Argent de poche pour d\'autres cadeaux',

            'I buy the gift and bring it':'J\'achète ce cadeau et je l\'amènerai au mariage',
            'Offer money to help buy this gift':'J\'ajoute de l\'argent pour acheter ce cadeau',

            'Port-des-Barques':'Pascale et Jean-Yves',
            'Manu':'Manu',
            'Bordeaux': 'les filles et Sylvain',
            'Örnsköldsvik':'Rooobin',
            'Sat':'Sat\'',
            'Kumpula':'Anu et Jouko',
            'Cape Town':'Lise, Francisco et Noah',
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
