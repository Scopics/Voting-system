CREATE TABLE IF NOT EXISTS Public.Regions (
  region_id int NOT NULL,
  name varchar NOT NULL,
  PRIMARY KEY (region_id)
);

CREATE TABLE IF NOT EXISTS Public.Districts (
  district_id int NOT NULL,
  name varchar NOT NULL,
  region_id int NOT NULL,
  PRIMARY KEY (district_id),
  CONSTRAINT Districts_region_id_foreign FOREIGN KEY (region_id) REFERENCES Public.Regions (region_id)
);

-- Explanations for field status:
-- -1 - simple voter
--  0 - regional commissioner
--  1 - central commissioner

CREATE TABLE IF NOT EXISTS Public.Users (
  user_id serial NOT NULL,
  name varchar NOT NULL,
  surname varchar NOT NULL,
  birthday_date date NOT NULL,
  gender varchar NOT NULL,
  district_id int NOT NULL,
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL,
  status int NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT Users_district_id_foreign FOREIGN KEY (district_id) REFERENCES Public.Districts (district_id)
);

CREATE TABLE IF NOT EXISTS Public.Votings (
  voting_id serial NOT NULL,
  name varchar NOT NULL,
  description text NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  PRIMARY KEY (voting_id)
);

CREATE TABLE IF NOT EXISTS Public.Variants (
  variant_id serial NOT NULL,
  voting_id int NOT NULL,
  name varchar NOT NULL,
  description text NOT NULL,
  base64Image varchar NOT NULL,
  PRIMARY KEY (variant_id),
  CONSTRAINT Variants_voting_id_foreign FOREIGN KEY (voting_id) REFERENCES Public.Votings (voting_id)
);

CREATE TABLE IF NOT EXISTS Public.Voting_results (
  voting_id int NOT NULL,
  variant_id int NOT NULL,
  user_id int NOT NULL,
  UNIQUE(voting_id, user_id),
  CONSTRAINT Voting_results_user_id_foreign FOREIGN KEY (user_id) REFERENCES Public.Users (user_id),
  CONSTRAINT Voting_results_variant_id_foreign FOREIGN KEY (variant_id) REFERENCES Public.Variants (variant_id),
  CONSTRAINT Voting_results_voting_id_foreign FOREIGN KEY (voting_id) REFERENCES Public.Votings (voting_id)
);

CREATE TABLE IF NOT EXISTS Public.Petitions (
  petition_id serial NOT NULL,
  name varchar NOT NULL,
  description text NOT NULL,
  author_user_id int NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  PRIMARY KEY (petition_id)
);

CREATE TABLE IF NOT EXISTS Public.Petition_results (
  petition_id int NOT NULL,
  user_id int NOT NULL,
  UNIQUE(petition_id, user_id),
  CONSTRAINT Petition_results_petition_id_foreign FOREIGN KEY (petition_id) REFERENCES Public.Petitions (petition_id),
  CONSTRAINT Petition_results_user_id_foreign FOREIGN KEY (user_id) REFERENCES Public.Users (user_id)
);

CREATE TABLE IF NOT EXISTS Public.Falsifications (
  falsification_id serial NOT NULL,
  author_user_id int NOT NULL,
  voting_id int NOT NULL,
  title varchar NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (falsification_id),
  CONSTRAINT Falsifications_author_user_id_foreign FOREIGN KEY (author_user_id) REFERENCES Public.Users (user_id),
  CONSTRAINT Falsifications_voting_id_foreign FOREIGN KEY (voting_id) REFERENCES Public.Votings (voting_id)
);
