# What :
This is the CRUD API of Ad-Astra. 🌟

# Create init and fill at least a little the DB

[script.sql](./createDB_createTables_fillTheTables_scipt.sql) 

For minimum insertion purpose, you have to enable to insert null values (because not all rows have been set a default value). 

Before : 
```sql 
-- my.ini
; Set the SQL mode to strict
;sql-mode=""
sql-mode="STRICT_ALL_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_DATE,NO_ZERO_IN_DATE,NO_AUTO_CREATE_USER"
```
After : 
```sql 
-- my.ini
; Set the SQL mode to strict
sql-mode=""
;sql-mode="STRICT_ALL_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_DATE,NO_ZERO_IN_DATE,NO_AUTO_CREATE_USER"
```

# Set up

# 1. Make sur to have the *adastra* database. 
2. `npm init`

# Run 

1. Run Wamp or a counterpart for database. 
2. `nodemon app.js`