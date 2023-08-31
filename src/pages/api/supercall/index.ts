import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();
  if (req.method === "POST") {
    const supercall = await db.collection("supercall").insertOne({
      ...req.body,
    });
    res.status(200).json(supercall);
  } else {
    const data = await db.collection("supercall").find().toArray();
    res.status(200).json(data);
  }
}
