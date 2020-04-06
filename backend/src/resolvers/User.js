import "babel-polyfill";

const User = {
  addedStores: async (parent, args, ctx, info) => {
    const userId = (parent._id).toString();
    const { client } = ctx;

    const db = client.db("theore");
    const collection = db.collection("stores");

    const result = await collection.find({ author: userId }).toArray();

    return result;
  },
};

export { User as default };
