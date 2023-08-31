import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (id) {
    let { db } = await connectToDatabase();
    const _id = new ObjectId(id[0]);
    const data = await db.collection("supercall").findOne({ _id });
    res.status(200).json(data);
  } else res.status(200).json({ data: "supercall id not found" });
}
