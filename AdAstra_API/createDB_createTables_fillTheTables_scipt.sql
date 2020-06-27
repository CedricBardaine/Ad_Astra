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
        password BLOB NOT NULL,
        sign_in_date DATE NOT NULL, 
        photo INT DEFAULT 0, /* to invoke in app the default profil pict */
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


-- ajouts V3.0 & V3.1

CREATE TABLE `Picture` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_userStar` INT,
  `xblock` BOOLEAN DEFAULT FALSE,

  FOREIGN KEY (id_userStar) REFERENCES UserStar(id)
)ENGINE=InnoDB;

CREATE TABLE `Video` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_userStar` INT,
  `xblock` BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (id_userStar) REFERENCES UserStar(id)
)ENGINE=InnoDB;

CREATE TABLE `Audio` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_userStar` INT,
  `xblock` BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (id_userStar) REFERENCES UserStar(id)
)ENGINE=InnoDB;

CREATE TABLE `Publication` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `kind` TEXT, -- AUDIO ||VIDEO || PICTURE
  `content` TEXT, 
  `id_userStar` INT,
  `id_picture` INT,
  `id_video` INT,
  `id_audio` INT,
  `xblock` BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
  FOREIGN KEY (id_picture) REFERENCES Picture(id),
  FOREIGN KEY (id_video) REFERENCES Video(id),
  FOREIGN KEY (id_audio) REFERENCES Audio(id)
)ENGINE=InnoDB;

CREATE TABLE `Reply` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` TEXT,
  `id_publication` INT,
  `id_userStar` INT,
  `xblock` BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (id_publication) REFERENCES Publication(id),
  FOREIGN KEY (id_userStar) REFERENCES UserStar(id)
)ENGINE=InnoDB;

CREATE TABLE `UserStar_Liked_Publication` (
  `id_userStar` INT,
  `id_publication` INT,

  PRIMARY KEY (`id_userStar`, `id_publication`),
  FOREIGN KEY (id_userStar) REFERENCES UserStar(id),
  FOREIGN KEY (id_publication) REFERENCES Publication(id)
)ENGINE=InnoDB;

CREATE TABLE `UserStar_Following_UserStar` (
  `id_userStar_following` INT,
  `id_userStar_followed` INT,

  PRIMARY KEY (`id_userStar_following`, `id_userStar_followed`),
  FOREIGN KEY (id_userStar_following) REFERENCES UserStar(id),
  FOREIGN KEY (id_userStar_followed) REFERENCES UserStar(id),

  CONSTRAINT `followingItself_chk` CHECK (id_userStar_following != id_userStar_followed)
)ENGINE=InnoDB;





-- Create triggers

DROP TRIGGER IF EXISTS before_insert_UserStar_birth;
DELIMITER |
CREATE TRIGGER before_insert_UserStar_birth BEFORE INSERT
ON adastra.userstar FOR EACH ROW
BEGIN
        IF  TIMESTAMPDIFF(YEAR, NEW.birth, NOW()) < 16  THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "ERROR: new user must be 16 years old or more." ;
        END IF;
END |
DELIMITER ;

DROP TRIGGER IF EXISTS before_update_Artist_suscribeduntil;
DELIMITER |
CREATE TRIGGER before_update_Artist_suscribeduntil BEFORE UPDATE
ON adastra.artist FOR EACH ROW
BEGIN
        IF  TIMESTAMPDIFF(SECOND, NEW.suscribed_until, OLD.suscribed_until) >= 0  THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "ERROR: renewal can't be already passed." ;
        END IF;
END |
DELIMITER ;





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
INSERT INTO Picture (id , id_userStar) VALUES (777 , 777 ) ; 
INSERT INTO Audio (id , id_userStar) VALUES (777 , 777 ) ; 
INSERT INTO Video (id , id_userStar) VALUES (777 , 777 ) ; 
INSERT INTO Publication (id , id_userStar, id_picture, id_video, id_audio) VALUES (777 , 777 , 777 , 777 , 777 ) ; 
INSERT INTO Reply (id , id_publication, id_userStar ) VALUES (777 , 777 , 777 ) ; 
INSERT INTO UserStar_Liked_Publication (id_userStar, id_publication) VALUES (777, 777 ) ;
-- INSERT INTO UserStar_Following_UserStar (id_userStar_following, id_userStar_followed) VALUES 




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

-- INSERT INTO UserStar 
-- (id, firstname, lastname, birth, mail, bio, name_spotify, id_profession, id_country) 
-- VALUES
-- (778, 'Jean', 'Jacques', '1985-02-27', 'JJBoomer@gmail.com', 'Bonjour, je fais de la musique jolie.', 'JBoom', 1, 1)
-- ;
-- INSERT INTO UserStar 
-- (id, firstname, lastname, birth, mail, photo, bio, name_spotify, id_profession, id_country) 
-- VALUES
-- (779, 'Christophe', 'Marée', '1975-10-16', 'ilestou@gmail.com', 42, 'Ça fait mal de vivre sans toi.', 'ChristTop', 1, 1)
-- ;

-- INSERT INTO Artist
-- (id, id_userStar, artist_name, suscribed, checked)
-- VALUES
-- (778, 778, 'JeanJ', true, false),
-- (779, 779, 'Christophe Marée', true, true)
-- ; 

INSERT INTO UserStar (id, firstname, lastname, birth, mail, photo, bio, name_spotify, id_profession, id_country) VALUES
(778, 'Jean', 'Jacques', '1985-02-27', 'JJBoomer@gmail.com', 0,'Bonjour, je fais de la musique.', 'JBoom', 1, 1),
(779, 'Timy', 'Lieuron', '2003-02-14', 'Timyy@gmail.com', 2,'À fond.', 'Timae', 1, 1),
(780, 'Alexandre', 'Toure', '1985-02-17', 'Allxe@gmail.com', 1,'', 'xEx', 1, 1),
(781, 'Chritian', 'Clavien', '1995-01-01', 'clavC@gmail.com', 3,'', '', 1, 1)
;
INSERT INTO Artist (id, id_userStar, artist_name, suscribed, checked) VALUES
(778, 778, 'JeanJ', false, false),
(779, 779, 'Timae', true, true),
(780, 780, 'xEx', false, false),
(781, 781, 'Clav', false, true)
;

INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",778,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",780,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",778,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",778,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",780,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",780,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",780,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",779,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",780,777,"PICTURE");
INSERT INTO `Publication` (`content`,`id_userStar`,`id_picture`,`kind`) VALUES 
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",779,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu",778,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",780,777,"PICTURE"),
("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",779,777,"PICTURE");