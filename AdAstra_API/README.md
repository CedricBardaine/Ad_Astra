# What :
This is the CRUD API of Ad-Astra. 🌟

# Set the DB

```sql
-- create the DB
CREATE DATABASE adastra;
USE adastra;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'astroadmin1234';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost'
```

```sql
-- Fill-up the DB
DROP DATABASE IF EXISTS adastra;
CREATE DATABASE adastra CHARACTER SET utf8;
USE adastra;

CREATE TABLE testtmp (
        id INT AUTO_INCREMENT,
        owner VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,

        PRIMARY KEY (id),
        INDEX (owner, date)
)ENGINE=InnoDB;

CREATE TABLE Country (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE, 
        xblock BOOLEAN,

        PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE Profession (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        xblock BOOLEAN,

        PRIMARY KEY (id)
)ENGINE=InnoDB; 

CREATE TABLE Random_sentence (
        id INT AUTO_INCREMENT,
        content TEXT NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id)
)ENGINE=InnoDB; 

CREATE TABLE Musical_style (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id)        
)ENGINE=InnoDB; 

CREATE TABLE Categorie (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id) 
)ENGINE=InnoDB; 

CREATE TABLE Formation (
        id INT AUTO_INCREMENT,
        trainer_name VARCHAR(50),
        title VARCHAR(255),
        subtitle VARCHAR(255),
        contenu TEXT,
        publication_date DATE,
        id_categorie INT,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_categorie) REFERENCES Categorie(id)
)ENGINE=InnoDB;

CREATE TABLE Survey ( 
        id INT AUTO_INCREMENT,
        content TEXT,
        xblock BOOLEAN,

        PRIMARY KEY (id)    
)ENGINE=InnoDB;

CREATE TABLE Contrat (
        id INT AUTO_INCREMENT,
        start_date DATE,
        end_date DATE,
        turnover INT,
        size INT, 
        xblock BOOLEAN,

        PRIMARY KEY (id)   
)ENGINE=InnoDB;

CREATE TABLE Need (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE, 
        xblock BOOLEAN,

        PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE Talent (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE, 
        xblock BOOLEAN,

        PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE UserStar (
        id INT AUTO_INCREMENT,
        firstname VARCHAR(50) NOT NULL, 
        lastname VARCHAR(50) NOT NULL, 
        birth DATE NOT NULL,
        mail VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL, /* TODO: encrypt it !! */
        sign_in_date DATE NOT NULL, 
        photo INT,
        name_spotify VARCHAR(50),
        name_deezer VARCHAR(50),
        name_youtube VARCHAR(50),
        name_bandcamp VARCHAR(50),
        id_profession INT,
        id_country INT, 
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_profession) REFERENCES Profession(id),
        FOREIGN KEY (id_country) REFERENCES Country(id)
)ENGINE=InnoDB;

CREATE TABLE Artist (
        id INT AUTO_INCREMENT,
        id_userStar INT,
        artiste_name VARCHAR(50),
        suscribed_until DATE, 
        suscribed BOOLEAN,
        id_survey INT,
        checked BOOLEAN,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_survey) REFERENCES Survey(id) 
)ENGINE=InnoDB;

CREATE TABLE Pro (
        id INT AUTO_INCREMENT,
        id_userStar INT, 
        company_name VARCHAR(255),
        id_contrat INT, 
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_contrat) REFERENCES Contrat(id)
)ENGINE=InnoDB;

CREATE TABLE Bound (
        id INT AUTO_INCREMENT,
        id_pro INT NOT NULL,
        id_artist INT NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_pro) REFERENCES Pro(id),
        FOREIGN KEY (id_artist) REFERENCES Artist(id)
)ENGINE=InnoDB;

CREATE TABLE Artist_need (
        id INT AUTO_INCREMENT,
        id_artist INT NOT NULL,
        id_need INT NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_artist) REFERENCES Artist(id),
        FOREIGN KEY (id_need) REFERENCES Need(id)
)ENGINE=InnoDB; 
CREATE TABLE Artist_Talent (
        id INT AUTO_INCREMENT,
        id_artist INT NOT NULL,
        id_talent INT NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_artist) REFERENCES Artist(id),
        FOREIGN KEY (id_talent) REFERENCES Talent(id)
)ENGINE=InnoDB; 

CREATE TABLE UserStar_musical_style (
        id INT AUTO_INCREMENT,
        id_userStar INT NOT NULL, 
        id_musical_style INT NOT NULL,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_musical_style) REFERENCES Musical_style(id)
)ENGINE=InnoDB;

CREATE TABLE Music (
        id INT AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL, 
        contenu INT UNIQUE NOT NULL, 
        publication_date DATE, 
        id_userStar INT, 
        id_musical_style INT,
        xblock BOOLEAN,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_musical_style) REFERENCES Musical_style(id) 
)ENGINE=InnoDB;
```

# Set up

1. Make sur to have the *adastra* database. 
2. `npm init`

# Run 

1. Run Wamp or a counterpart for database. 
2. `nodemon app.js`