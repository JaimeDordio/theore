import "babel-polyfill";
import dotenv from "dotenv";
import chalk from "chalk";
import uuidv4 from "uuid/v4";
import { GraphQLServer } from "graphql-yoga";
import { MongoClient, ObjectID } from "mongodb";

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

dotenv.config();

const usr = process.env.MONGO_DB_USERNAME;
const pwd = process.env.MONGO_DB_PASSWORD;
const url = "theoredb-9lffj.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

const connectToDb = async function (usr, pwd, url) {
  const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  return client;
};

/**
 * Starts GraphQL server, with MongoDB Client in context Object
 * @param {client: MongoClient} context The context for GraphQL Server -> MongoDB Client
 */

const runGraphQLServer = function (context) {
  const resolvers = {
    Query,
    Mutation,
  };

  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context,
  });

  const options = {
    port: 8001,
  };

  try {
    server.start(options, ({ port }) => {
      console.log(chalk.bgRed("\n---------------------------------------"));
      console.log(chalk.bgRed(`Server started, listening on port ${port}.`));
      console.log(chalk.bgRed("---------------------------------------\n"));
    });
  } catch (e) {
    console.info(e);
    server.close();
  }
};

const runApp = async function () {
  const client = await connectToDb(usr, pwd, url);
  console.log(chalk.bgGreen.black("\nConnect to Mongo DB"));
  try {
    runGraphQLServer({ client });
  } catch (e) {
    console.info(e);
    client.close();
  }
};

runApp();
