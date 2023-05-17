import dbconnect from "@/connection/conn";
import User from "@/models/user";
import { notification } from "antd";
import { isEmpty } from "lodash";
import Jwt from "jsonwebtoken";
import { excrypt } from "@/helper/shared";

// const twilio = require("twilio");
// require("dotenv").config();
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

export default async function MessageController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        const result = await Message.find();
        return res.send({ message: result });
      } catch (err) {
        return res.send({ message: "failed" });
      }
    }
    case "POST": {
      try {
        console.log(req.body);
        const validateEntry = await User.find({ number: req.body.number });
        if (isEmpty(validateEntry)) {
          const user = new User({ ...req.body });
          const result = await user.save();
          const mediatordata = {
            id: result._id,
          };
          const token = await Jwt.sign(mediatordata, process.env.SECRET_KEY);
          console.log(token);
        } else {
          const mediatordata = {
            id: validateEntry[0]._id,
          };
          const token = await Jwt.sign(mediatordata, process.env.SECRET_KEY);
          console.log(token);
        }
        return res.status(200).send({ message: "success" });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "failed" });
      }
    }
  }
}
