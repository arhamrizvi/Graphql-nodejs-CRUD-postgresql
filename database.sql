CREATE database userapp;

--\c userapp

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ;
