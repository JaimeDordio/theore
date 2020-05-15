# Theore - The Online Review

![GitHub last commit](https://img.shields.io/github/last-commit/JaimeDordio/theore)

![theore](https://github.com/JaimeDordio/theore/blob/master/images/Theore-GitHub_Readme_Hero.png?raw=true)

## Backend

The backend is built mainly with NodeJS. Every tool used will be detailed on the *Dependencies* section.



### 🚩 Getting Started

These instructions will get you a copy of the project up and running on your local machine for start using it.



#### Installing

A step by step series of examples that tell you how to get a development environment running.

Installing dependencies:

```bash
$ yarn
```

Starting on local
```bash
$ yarn start
```



### ℹ️ Methods

#### Type User

```bash
type User {
 _id: ID!
 username: String!
 password: String!
 userSince: String
 token: ID
 addedStores: [Store!]
}
```

#### Type Store

```bash
type Store {
 _id: ID!
 name: String!
 website: String!
 dateAdded: String
 rating: Int
 author: User!
}
```

#### Queries

```bash
 getUsersStores(_id: ID!, token: ID!): [Store!]
```
```bash
 getAllStores: [Store!]
```
```bash
 searchStore(name: String!): [Store!]
```

#### Mutations

```bash
signUp(username: String!, password: String!): User!
```
```bash
login(username: String!, password: String!): User!
```
```bash
addStore(name: String!, website: String!, author: ID!, token: ID!): Store!
```
```bash
removeStore(_id: ID!, author: ID!, token: ID!): String!
```
```bash
editStore(_id: ID!, author: ID!, token: ID!, newName: String!, newWebsite: String!): Store!
```



### 🖇 Dependencies

Located in the `package.json` file.

```bash
	"@babel/cli": "^7.6.0",
	"@babel/core": "^7.6.0",
	"@babel/node": "^7.6.1",
	"@babel/preset-env": "^7.6.0",
	"babel-polyfill": "^6.26.0",
	"chalk": "^3.0.0",
	"dotenv": "^8.2.0",
	"graphql-yoga": "^1.18.3",
	"mongodb": "^3.3.5",
	"uuid": "^7.0.3"
```

- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env for nodejs projects.
- [graphql-yoga](https://www.npmjs.com/package/graphql-yoga) - Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
- [mongodb](https://www.npmjs.com/package/mongodb) - The MongoDB Database




### 🛠 Built With

* [NodeJS](https://nodejs.org/) - JavaScript runtime
* [Yarn](https://yarnpkg.com/) - Package manager



### 🚀 Deployment

#### Heroku
This project uses [Heroku](https://www.heroku.com).

Live version can be found on this domain: **[theore-api.herokuapp.com](https://theore-api.herokuapp.com)**.



------



## Frontend

Theore's Frontend is built mainly with ReactJS. Every used tool will be detailed on the *Dependencies* section. 



### 🚩 Getting Started

These instructions will get you a copy of the project up and running on your local machine for start using it.

#### Installing

A step by step series of examples that tell you how to get a development environment running.

Installing dependencies:

```bash
$ yarn
```

Starting on local:

```bash
$ yarn start
```



#### Environment Variables

In frontend root folder, one environment variable file is needed for ReactJS to use it:

```
REACT_APP_APIFLASH_KEY=<Screenshots API Key>
```



#### Theore GraphQL API

This project uses a self-developed GraphQL API. For more information, visit the API docs.



### 🖇 Dependencies

They are in the `package.json` file.

Project dependencies:

```json
"dependencies": {
      "@apollo/react-hooks": "^3.1.4",
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.3.2",
      "@testing-library/user-event": "^7.1.2",
      "apollo-boost": "^0.4.7",
      "apollo-client": "^2.6.8",
      "axios": "^0.19.2",
      "graphql": "^15.0.0",
      "md5": "^2.2.1",
      "postcss-import": "^12.0.1",
      "react": "^16.13.1",
      "react-dom": "^16.13.1",
      "react-router": "^5.1.2",
      "react-router-dom": "^5.1.2",
      "react-scripts": "3.4.1",
      "styled-components": "^5.1.0",
      "tailwindcss": "^1.2.0"
},
```

- [axios](https://github.com/axios/axios) - Promise based HTTP client
- [graphql](https://graphql.org/) - Using GraphQL in our application



### 🛠 Built With

* [ReactJS](https://reactjs.org) - The frontend framework used
* [Yarn](https://yarnpkg.com) - Package manager



### 🚀 Deployment

#### Vercel

This project uses [Vercel.com](https://vercel.com/).

Live version can be found on this domain: **[theore.now.sh](https://theore.now.sh/)**.



<p align="center">
  <a href="https://vercel.com">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Vercel</h3>
  </a>
  <p align="center">Develop. Preview. Ship.</p>
</p>



## Environment Variables

At root folder, this environments variables are required:

```
PORT=<Backend Port>
MONGO_DB_USERNAME=<MongoDB Username>
MONGO_DB_PASSWORD=<MongoDB Password>
MONGO_DB_URL=<MongoDB Database URL>
```
