
const express = require("express");
const app = express();
const PORT = 6969;
//const userData =  require("./MOCK_DATA.json"); //replace this with postgresql
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const { graphqlHTTP } = require('express-graphql'); //to create graphl server
const cors = require('cors');
const pool = require('./db');
app.use('*',cors());




//Type definition is basically we need to define the type for the user
//A user type might have an id, firstName, lastName, email, password

const UserType = new GraphQLObjectType({
    name:"users", //recommend putting the name of the database
    fields: () => ({
       //define the columns for our user type
       id: { type: GraphQLInt},
       firstname: { type: GraphQLString},
       lastname: { type: GraphQLString},
       email: { type: GraphQLString},
       password: { type: GraphQLString}, 
    })
})


//the major query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: { //represent the different queries we can have
        //here is where we start creating our queries

        // getAllUser
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { 
              id : { 
                type: GraphQLInt 
              }
            },//do we accept any arguments for this eg args: {id: {type: GraphQLInt} }
              resolve(parent, args, context, info) {
                //return userData 
                return pool.query('select * from public.users').then((result) => { 
                  return result.rows });
              }
            },
        // getUserById
        getUserById:{
          type: UserType,
          args:{
            id:{
              //name:'id',
              type: GraphQLInt
            }
          },
          resolve: function (parent, args,context, info) {
            return pool.query('select * from users where id = $1',[args.id]).then((result) => {
              //console.log(result.rows[0]);
              return result.rows[0]
            });
          }
        }
      }
    });

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // createUser,
        // updateUser,
        // deleteUser
        createUser : {
            type: UserType,
            args: {
                firstname : { type: GraphQLString},
                lastname : { type: GraphQLString},
                email : { type: GraphQLString},
                password : { type: GraphQLString},
            },
            resolve(parent,args){
                //userData.push({id: userData.length+1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password})
                //return args //like rest.send
                return pool.query('INSERT INTO public.users (firstname, lastname, email, password) VAlUES ($1,$2,$3,$4) RETURNING *',[args.firstname,args.lastname,args.email,args.password]).then((result) => {
                  //console.log(result.rows[0]);
                  return result.rows[0]
                });
              
              }
        },
        updateUser : {
          type: UserType,
          args: {
              id : { type: GraphQLInt},
              firstname : { type: GraphQLString},
              lastname : { type: GraphQLString},
              email : { type: GraphQLString},
              password : { type: GraphQLString},
          },
          resolve(parent,args){              
              return pool.query('update public.users SET firstname = $1 where id = $2',[args.firstname,args.id]).then((result) => {
                // console.log(result.rows[0]);
                return result.rows[0]
              });
            
            }
      },
      deleteUser : {
        type: UserType,
        args: {
            id : { type: GraphQLInt},
            firstname : { type: GraphQLString},
            lastname : { type: GraphQLString},
            email : { type: GraphQLString},
            password : { type: GraphQLString},
        },
        resolve(parent,args){
            return pool.query('delete from users where id = $1 RETURNING *',[args.id]).then((result) => {
              //console.log(result.rows[0]);
              return result.rows[0]
            });
          
          }
    }
    }
})


//schema is just a combination between mutation and queries
//mutation: update, create, delete
//queries: get data 
const schema = new GraphQLSchema({query:RootQuery, mutation:Mutation})

// at the bottom only
app.use('/graphql',graphqlHTTP({
    schema, //add database here
    graphiql: true //graphql interface
})) //graphql has only one route

app.listen(PORT, () => {
    console.log("Running on localhost:6969/graphql");
});