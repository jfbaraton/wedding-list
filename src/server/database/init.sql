CREATE DATABASE wedding;

use wedding;

CREATE TABLE items ( -- description uses name + '_desc' as a key from i18n
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  price INT,
  PRIMARY KEY (id)
);

CREATE TABLE people (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  hash varchar(50) NOT NULL, -- UUID for writing queries (security check)
  language varchar(2) NOT NULL, -- fi, en, ru, se, fr
  PRIMARY KEY (id),
  UNIQUE KEY(hash)
);

CREATE TABLE contributions (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT, -- what item
  people_id INT, -- who pays
  comment varchar(500) DEFAULT '',

  -- "Buy: I buy and bring"
  -- "Pay: I pay X€"
  type varchar(50) NOT NULL,
  amount INT,

  state INT DEFAULT 0, -- 2 for canceled

  PRIMARY KEY (id),
  CONSTRAINT fk_item FOREIGN KEY (item_id)
  REFERENCES items(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT fk_people FOREIGN KEY (people_id)
  REFERENCES people(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

INSERT INTO items (id, name, price) VALUES (1,'piggy_bank',1);

-- price:10, item_name:'baking_robot'
INSERT INTO items (name, price) VALUES
('baking_robot', 160),
('printer', 430),
('plates_cutlery', 50);



INSERT INTO people (name, hash, language) VALUES
('Port-des-Barques', 'PDB', 'fr'), -- maman papa
('Manu',             'MAN', 'fr'), -- manu
('Huittinen',        'HTT', 'fi'), -- Lena, Matti, Masha
('Bordeaux',         'BDX', 'fr'), -- Sylvain + 3
('Imatra',           'IMT', 'ru'), -- Vadim + 1
('Uppsala',          'UPS', 'se'), -- Amir +1
('Örnsköldsvik',     'ÖVK', 'se'), -- Robin
('Eerikilaiset',     'EEK', 'se'), -- Niklas + Jessica
('Ben',              'BEN', 'fi'), -- Ben
('Kori perhe',       'KOR', 'fi'), -- Santeri +1
('Köpenhamn',        'KPH', 'dk'), -- Tom
('Sat',              'SAT', 'fr'), -- Sat
('Kumpula',          'KMP', 'fi'), -- Anu + Jouko
('Paula',            'PAU', 'fi'), -- Paula
('Minna',            'MIN', 'fi'), -- Minna
('Cape Town',        'CPT', 'en'); -- Lise + Francisco + 1

INSERT INTO contributions (item_id, people_id, comment, type, amount) VALUES
(1,1, 'pocket money test', 'Pay' , 260);

-- test state = 2 for canceled
INSERT INTO contributions (item_id, people_id, comment, type, amount, state) VALUES (1,1, 'pocket money test', 'Pay' , 260,2);
