import { getCollection } from "../utils/helpers.js";

export async function getCollectionData(req, res) {
  try {
    const collectionName = req.params.collection;
    const collection = getCollection(collectionName);

    const data = await collection.find({}).toArray();
    return res.status(200).json(data);
  } catch (err) {
    console.error("🚀 error while fetching the data: ", err);

    return res.status(500).json({ error: err });
  }
}
