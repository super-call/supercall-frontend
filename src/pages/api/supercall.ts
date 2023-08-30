import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  //   await db.collection("supercall").insertOne({
  //     abis: "abis",
  //     nodes: "nodes",
  //     edges: "edges",
  //     states: "states",
  //   });

  //   const getData = await db.collection("supercall").find().toArray();

  const _id = new ObjectId("64ef808e080ff6a5f92b3337");
  const getData = await db.collection("supercall").findOne({ _id });

  res.status(200).json({ data: getData });
}
