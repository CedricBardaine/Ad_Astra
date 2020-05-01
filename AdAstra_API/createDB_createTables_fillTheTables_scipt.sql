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

CREATE TABLE Category (
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
        id_category INT,
        xblock BOOLEAN DEFAULT FALSE,

        PRIMARY KEY (id),
        FOREIGN KEY (id_category) REFERENCES Category(id)
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
        password BLOB NOT NULL, /* TODO: encrypt it !! */
        sign_in_date DATE NOT NULL, 
        photo INT,
        bio TEXT,
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
        blocked BOOLEAN,
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
INSERT INTO Category (id ) VALUES (777 ) ; 
INSERT INTO Formation (id , id_category ) VALUES (777 , 777 ) ; 
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



-- Fill tables : for essential rows
-- -- à ne pas modifier !! certaines fct de l'app Ad Astra reposent sur ces ids

INSERT INTO Country (id, name) VALUES (1, "France") ; 
INSERT INTO Profession (id, name) VALUES (1, "Artiste") ; 
INSERT INTO Talent (id , name) VALUES
(1 ,  "Compositeur"),
(2 ,  "Parolier"),
(3 ,  "Arrangeur"),
(4 ,  "Auteur de chansons"),
(5 ,  "Chanteur"),
(6 ,  "Musicien de scène"),
(7 ,  "Musicien de studio"),
(8 ,  "DJ") ;
INSERT INTO Musical_style (id , name) VALUES
(1 ,  "Blues"),
(2 ,  "Funk"),
(3 ,  "Jazz"),
(4 ,  "Metal"),
(5 ,  "Pop"),
(6 ,  "Punk"),
(7 ,  "Rap"),
(8 ,  "Rock'n'roll") ;
INSERT INTO Need (id , name) VALUES
(1 ,  "Aide au management"),
(2 ,  "Gestion des droits d’auteur"),
(3 ,  "Obtenir de la visibilité"),
(4 ,  "Devenir intermittent du spectacle"),
(5 ,  "Mieux connaître l’industrie de la musique"),
(6 ,  "Chercher des subventions"),
(7 ,  "Se faire du réseau") ;



-- Fill tables : for additional exemples

INSERT INTO UserStar 
(id, firstname, lastname, birth, mail, bio, name_spotify, id_profession, id_country) 
VALUES
(778, 'Jean', 'Jacques', '1985-02-27', 'JJBoomer@gmail.com', 'Bonjour, je fais de la musique jolie.', 'JBoom', 1, 1)
;
INSERT INTO UserStar 
(id, firstname, lastname, birth, mail, photo, bio, name_spotify, id_profession, id_country) 
VALUES
(779, 'Christophe', 'Marée', '1975-10-16', 'ilestou@gmail.com', 1, 'Ça fait mal de vivre sans toi.', 'ChristTop', 1, 1)
;
INSERT INTO Artist
(id, id_userStar, artist_name, suscribed, checked)
VALUES
(778, 778, 'JeanJ', true, false),
(779, 779, 'Christophe Marée', true, true)
; 
