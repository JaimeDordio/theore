import "babel-polyfill";
import chalk from 'chalk';

const Mutation = {

  signUp: async (parent, args, ctx, info) => {
    const { username, password } = args
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`--------REQUEST MADE TO 'signUp'--------`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("theore");
    const collection = db.collection("users");

    if(await collection.findOne({username})){
      throw new Error(`Username "${username}" is not available.`);
    }

    const result = await collection.insertOne({username, password});

    return {
      _id: result.ops[0]._id,
      username,
      password
    }
  }
};

export { Mutation as default };
