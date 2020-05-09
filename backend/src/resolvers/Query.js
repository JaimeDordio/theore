import "babel-polyfill";
import chalk from "chalk";
import { ObjectID } from "mongodb";

const Query = {
  getUsersStores: async (parent, args, ctx, info) => {
    const { _id, token } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'getUsersStores'`));
    console.log(chalk.blue(`ID: ${_id}`));
    console.log(chalk.blue(`Token: ${token}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const storesCollection = db.collection("stores");
    const usersCollection = db.collection("users");

    if (!(await usersCollection.findOne({ _id: ObjectID(_id), token }))) {
      throw new Error("User not logged in.");
    }

    const result = await storesCollection.find({ author: _id }).toArray();
    return result;
  },

  getAllStores: async (parent, args, ctx, info) => {
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'getAllStores'`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const storesCollection = db.collection("stores");

    const result = await storesCollection.find({}).toArray();

    return result;
  },

  searchStore: async (parent, args, ctx, info) => {
    const { name } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'searchStore'`));
    console.log(chalk.blue(`Name: ${name}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const storesCollection = db.collection("stores");

    const result = await storesCollection.find({name}).toArray();

    return result;
  }
};

export { Query as default };
