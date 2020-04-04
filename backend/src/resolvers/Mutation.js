import "babel-polyfill";
import * as uuid from 'uuid'
import chalk from "chalk";

const Mutation = {
  signUp: async (parent, args, ctx, info) => {
    const { username, password } = args;
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'login'`));
    console.log(chalk.blue(`Username: ${username}`));
    console.log(chalk.blue(`Password: ${password}`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const collection = db.collection("users");

    if (await collection.findOne({ username })) {
      throw new Error(`Username "${username}" is not available.`);
    }

    const result = await collection.insertOne({ username, password });

    return {
      _id: result.ops[0]._id,
      username,
      password,
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
      await collection.findOneAndUpdate({ username }, { $set: { token: uuid.v4() } });
    } else {
      throw new Error(`Wrong username or password.`);
    }

    const result2 = await collection.findOne({username});

    return result2;
  },
};

export { Mutation as default };
