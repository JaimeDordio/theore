import "babel-polyfill";
import chalk from "chalk";
import { ObjectID } from "mongodb";

const Query = {
  getStores: async (parent, args, ctx, info) => {
    const { _id, token } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'getStores'`));
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

  allStores: async (parent, args, ctx, info) => {
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'allStores'`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const storesCollection = db.collection("stores");

    const result = await storesCollection.find({}).toArray();

    return result;
  }
};

export { Query as default };
