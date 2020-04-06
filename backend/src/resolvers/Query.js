import "babel-polyfill";
import chalk from 'chalk';
import { ObjectID } from "mongodb";

const Query = {
  getStores: async (parent, args, ctx, info) => {
    const { _id, token } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'addStore'`));
    console.log(chalk.blue(`ID: ${_id}`));
    console.log(chalk.blue(`Token: ${token}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const collection = db.collection("stores");
    const collection2 = db.collection("users");

    if(! await collection2.findOne({_id: ObjectID(_id), token})){
      throw new Error ("User not logged in.")
    }

    const result = await collection.find({author: ObjectID(_id)}).toArray();

    console.log(_id)

    return result;

  }
};

export { Query as default };
