// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pembuatan api untuk product
import { retriveData, retriveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message?: string;
  data: any;
}; //digunakan untuk type ke response nya
// dengan adanya tanda [] maka menjelaskan kalau si typenya berbentuk array

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.product![1]) {
    const data = await retriveDataById("products", req.query.product![1]);
    if (req.query.product![1] === data.id) {
      res.status(200).json({ status: true, statusCode: 200, data });
    } else {
      res.status(404).json({
        status: false,
        statusCode: 404,
        data: null,
        message: "data not found",
      });
    }
  } else {
    const data = await retriveData("products");
    res.status(200).json({ status: true, statusCode: 200, data });
  }
}

// const data = [
//   {
//     id: 1,
//     name: "baju baru",
//     price: 100000,
//     size: "S",
//   },
//   {
//     id: 2,
//     name: "baju lama",
//     price: 50000,
//     size: "S",
//   },
// ];
