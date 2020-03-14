-- create the DB
DROP DATABASE IF EXISTS adastra ; 
CREATE DATABASE adastra CHARACTER SET utf8;
USE adastra;

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'astroadmin1234';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost' ; 



-- create tables

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
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE Profession (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)
)ENGINE=InnoDB; 

CREATE TABLE Random_sentence (
        id INT AUTO_INCREMENT,
        content TEXT NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)
)ENGINE=InnoDB; 

CREATE TABLE Musical_style (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)        
)ENGINE=InnoDB; 

CREATE TABLE Categorie (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

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
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_categorie) REFERENCES Categorie(id)
)ENGINE=InnoDB;

CREATE TABLE Survey ( 
        id INT AUTO_INCREMENT,
        content TEXT,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)    
)ENGINE=InnoDB;

CREATE TABLE Contrat (
        id INT AUTO_INCREMENT,
        start_date DATE,
        end_date DATE,
        turnover INT,
        size INT, 
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)   
)ENGINE=InnoDB;

CREATE TABLE Need (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE, 
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE Talent (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE, 
        xblock BOOLEAN DEFAULT FALSE,

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
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_profession) REFERENCES Profession(id),
        FOREIGN KEY (id_country) REFERENCES Country(id)
)ENGINE=InnoDB;

CREATE TABLE Artist (
        id INT AUTO_INCREMENT,
        id_userStar INT,
        artist_name VARCHAR(50),
        suscribed_until DATE, 
        suscribed BOOLEAN,
        id_survey INT,
        checked BOOLEAN,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_survey) REFERENCES Survey(id) 
)ENGINE=InnoDB;

CREATE TABLE Pro (
        id INT AUTO_INCREMENT,
        id_userStar INT, 
        company_name VARCHAR(255),
        id_contrat INT, 
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_contrat) REFERENCES Contrat(id)
)ENGINE=InnoDB;

CREATE TABLE Bound (
        id INT AUTO_INCREMENT,
        id_pro INT NOT NULL,
        id_artist INT NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_pro) REFERENCES Pro(id),
        FOREIGN KEY (id_artist) REFERENCES Artist(id)
)ENGINE=InnoDB;

CREATE TABLE Artist_need (
        id INT AUTO_INCREMENT,
        id_artist INT NOT NULL,
        id_need INT NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_artist) REFERENCES Artist(id),
        FOREIGN KEY (id_need) REFERENCES Need(id)
)ENGINE=InnoDB; 
CREATE TABLE Artist_Talent (
        id INT AUTO_INCREMENT,
        id_artist INT NOT NULL,
        id_talent INT NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_artist) REFERENCES Artist(id),
        FOREIGN KEY (id_talent) REFERENCES Talent(id)
)ENGINE=InnoDB; 

CREATE TABLE UserStar_musical_style (
        id INT AUTO_INCREMENT,
        id_userStar INT NOT NULL, 
        id_musical_style INT NOT NULL,
        xblock BOOLEAN DEFAULT FALSE,

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
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
        FOREIGN KEY (id_musical_style) REFERENCES Musical_style(id) 
)ENGINE=InnoDB;



-- Fill tables : for PKs and FKs

USE adastra;

INSERT INTO testtmp (id ) VALUES (777 ) ; 
INSERT INTO Country (id ) VALUES (777 ) ; 
INSERT INTO Profession (id ) VALUES (777 ) ; 
INSERT INTO Random_sentence (id ) VALUES (777 ) ; 
INSERT INTO Musical_style (id ) VALUES (777 ) ; 
INSERT INTO Categorie (id ) VALUES (777 ) ; 
INSERT INTO Formation (id , id_categorie ) VALUES (777 , 777 ) ; 
INSERT INTO Survey (id ) VALUES (777 ) ; 
INSERT INTO Contrat (id ) VALUES (777 ) ; 
INSERT INTO Need (id ) VALUES (777 ) ; 
INSERT INTO Talent (id ) VALUES (777 ) ; 
INSERT INTO UserStar (id , id_profession , id_country ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO Artist (id , id_userStar , id_survey ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO Pro (id , id_userStar , id_contrat ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO Bound (id , id_pro , id_artist ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO Artist_need (id , id_artist , id_need ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO Artist_Talent (id , id_artist , id_talent ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO UserStar_musical_style (id , id_userStar , id_musical_style ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO Music (id , id_userStar , id_musical_style ) VALUES (777 , 777 , 777 ) ; 