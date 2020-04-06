import "babel-polyfill";
import { ObjectID } from "mongodb";

const User = {
  addedStores: async (parent, args, ctx, info) => {
    const user = parent._id;
    const { client } = ctx;

    const db = client.db("theore");
    const collection = db.collection("stores");

    const result = await collection.find({author: ObjectID(user)}).toArray();
    return result;
  },
};

export { User as default };
