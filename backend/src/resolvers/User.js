import "babel-polyfill";
import { ObjectID } from "mongodb";

const User = {
  addedStores: async (parent, args, ctx, info) => {
    const user = (parent._id).toString();
    const { client } = ctx;

    const db = client.db("theore");
    const collection = db.collection("stores");

    const result = await collection.find({author: user}).toArray();
    
    return result;
  },
};

export { User as default };
