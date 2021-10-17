## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This is a nodejs using express js framework, graphql and postgresql, to utilize CRUD operations.
	
## Technologies
Project is created with:
* JavaScript
* Nodejs
* Express-js
* PostgreSQL
* GraphQL
	
## Setup
To run this project, use:

```
$ npm start
```

And the server runs on localhost:6969/graphql:

To access the retrievals, use 'query' and to access create, update and delete, use 'mutation' for example:
```
query{
  getAllUsers{
    id
    firstname
    lastname
    email
    password
  }
}

mutation{
  createUser(firstname:"test first", lastname:"test last", email:"test@test.com", password:"pass"){
    firstname
    lastname
    email
    password
  }
}
```
