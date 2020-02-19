# What :
This is the CRUD API of Ad-Astra. 🌟

# Set the DB

```sql
CREATE DATABASE adastra;
USE adastra;

CREATE TABLE testtmp (
    ->   id INT AUTO_INCREMENT,
    ->   owner VARCHAR(255) NOT NULL,
    ->   name VARCHAR(255) NOT NULL,
    ->   description TEXT,
    ->   date DATE,
    ->   PRIMARY KEY (id),
    ->   INDEX (owner, date)
    -> );

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'astroadmin1234';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost'
```

# Set up

1. Make sur to have the *adastra* database. 
2. `npm init`

# Run 

1. Run Wamp or a counterpart. 
2. `nodemon app.js`