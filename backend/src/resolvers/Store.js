import "babel-polyfill";
import { ObjectID } from "mongodb";

const Store = {
  author: async (parent, args, ctx, info) => {
    const author = parent.author;
    const { client } = ctx;

    const db = client.db("theore");
    const collection = db.collection("users");

    const result = await collection.findOne({_id: ObjectID(author)});
    return result;
  },
};

export { Store as default };
