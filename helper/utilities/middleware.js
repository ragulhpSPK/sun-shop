import jwt from "jsonwebtoken";
import { decrypt } from "./crypt";

export const middleware = async (req, res) => {
  try {
    const hasedToken = req.headers["cookie"].split("=")[1];
    const result = await decrypt(hasedToken);
    const id = jwt.verify(JSON.parse(result), process.env.SECRET_KEY);
    if (req.method === "GET" || req.method === "DELETE") {
      return (req.query.uid = id);
    } else {
      return (req.body.uid = id);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
