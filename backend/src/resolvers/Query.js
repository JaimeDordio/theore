import "babel-polyfill";
import chalk from 'chalk';

const Query = {
  test: async (parent, args, ctx, info) => {
    const { client } = ctx;

    console.log(chalk.blue(`----------------------------------------`));
    console.log(chalk.blue(`REQUEST MADE TO 'test'`));
    console.log(chalk.blue(`----------------------------------------`));

    const db = client.db("Test");
    const requestsTestCollection = db.collection("requests-test");
    const result = await requestsTestCollection.find();

    return "OK";
  }
};

export { Query as default };
