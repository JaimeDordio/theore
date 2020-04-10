import "babel-polyfill";
import * as uuid from "uuid";
import chalk from "chalk";
import { ObjectID } from "mongodb";

const Mutation = {
  signUp: async (parent, args, ctx, info) => {
    const { username, password } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'signUp'`));
    console.log(chalk.blue(`Username: ${username}`));
    console.log(chalk.blue(`Password: ${password}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const collection = db.collection("users");

    if (await collection.findOne({ username })) {
      throw new Error(`Username "${username}" is not available.`);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;
    const userSince = today;

    const result = await collection.insertOne({
      username,
      password,
      userSince,
    });

    return {
      _id: result.ops[0]._id,
      username,
      password,
      userSince,
    };
  },

  login: async (parent, args, ctx, info) => {
    const { username, password } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'login'`));
    console.log(chalk.blue(`Username: ${username}`));
    console.log(chalk.blue(`Password: ${password}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const collection = db.collection("users");

    const result = await collection.findOne({ username, password });

    if (result) {
      await collection.findOneAndUpdate(
        { username },
        { $set: { token: uuid.v4() } }
      );
    } else {
      throw new Error(`Wrong username or password.`);
    }

    const result2 = await collection.findOne({ username });

    return result2;
  },

  addStore: async (parent, args, ctx, info) => {
    const { name, website, author, token } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'addStore'`));
    console.log(chalk.blue(`Name: ${name}`));
    console.log(chalk.blue(`Website: ${website}`));
    console.log(chalk.blue(`Author: ${author}`));
    console.log(chalk.blue(`Token: ${token}`));
    console.log(chalk.blue(`----------------------------------------`));


    const db = client.db("theore");
    const collection = db.collection("stores");
    const collection2 = db.collection("users");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;
    const dateAdded = today;

    if(! await collection2.findOne({_id: ObjectID(author), token})){
      throw new Error(`User not logged in.`)
    }

    if(await collection.findOne({website})){
      throw new Error(`Website already added.`)
    }

    const result = await collection.insertOne({name, website, dateAdded, author});

    return {
      _id: result.ops[0]._id,
      name,
      website,
      dateAdded,
      author
    }
  },

  removeStore: async (parent, args, ctx, info) => {
    const { _id, author, token } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'removeStore'`));
    console.log(chalk.blue(`ID: ${_id}`));
    console.log(chalk.blue(`Author: ${author}`));
    console.log(chalk.blue(`Token: ${token}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const storesCollection = db.collection("stores");
    const usersCollection = db.collection("users");

    if(! await usersCollection.findOne({_id: ObjectID(author), token})){
      throw new Error(`User not logged in.`)
    }

    if(! await storesCollection.findOne({_id: ObjectID(_id), author})){
      throw new Error(`User ${author} did not add this shop.`)
    }

    await storesCollection.findOneAndDelete({_id: ObjectID(_id)});

    return `Store removed successfully.`

  },

  editStore: async (parent, args, ctx, info) => {
    const { _id, author, token, newName, newWebsite } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'editStore'`));
    console.log(chalk.blue(`ID: ${_id}`));
    console.log(chalk.blue(`Author: ${author}`));
    console.log(chalk.blue(`Token: ${token}`));
    console.log(chalk.blue(`New Name: ${newName}`));
    console.log(chalk.blue(`New Website: ${newWebsite}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const storesCollection = db.collection("stores");
    const usersCollection = db.collection("users");

    if(! await usersCollection.findOne({_id: ObjectID(author), token})){
      throw new Error(`User not logged in.`)
    }

    if(! await storesCollection.findOne({_id: ObjectID(_id), author})){
      throw new Error(`User ${author} did not add this shop.`)
    }

    const result = await storesCollection.findOneAndUpdate({_id: ObjectID(_id)}, {$set: {name: newName, website: newWebsite}}, {returnOriginal: false});

    return result.value;
  }
};

export { Mutation as default };
