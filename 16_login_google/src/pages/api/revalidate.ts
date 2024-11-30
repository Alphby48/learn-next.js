// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidate: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query);

  if (
    req.query.token &&
    req.query.token === process.env.REVALIDATE_TOKEN &&
    req.query.data &&
    req.query.data === "product"
  ) {
    try {
      await res.revalidate(`/product/static`); // revalidate halaman product static
      return res.status(200).json({ revalidate: true });
    } catch (error) {
      return res.status(500).json({ revalidate: false });
    }
  } else if (
    req.query.token &&
    req.query.token !== process.env.REVALIDATE_TOKEN
  ) {
    return res
      .status(401)
      .json({ revalidate: false, message: "invalid token" });
  } else {
    return res
      .status(404)
      .json({ revalidate: false, message: "data not found" });
  }
}
