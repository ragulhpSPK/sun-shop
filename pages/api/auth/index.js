import dbconnect from "@/connection/conn";
import Message from "@/models/message";
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
        res.send({ message: result });
      } catch (err) {
        res.send({ message: "failed" });
      }
    }
    case "POST": {
      try {
        // const sendMessage = await client.messages.create({
        //   body: "99340",
        //   to: req.body.number,
        //   from: +17342943991,
        // });
        // console.log(sendMessage);

        const validateUser = await Message.find({ number: req.body.number });

        if (!isEmpty(validateUser)) {
          console.log(validateUser, "validate user");
          const auth = {
            number: validateUser[0].number,
          };

          const token = Jwt.sign({ user: auth }, process.env.SECRET_KEY);

          return res.status(200).send({
            message: excrypt(token),
            data: excrypt(validateUser[0]._id),
          });

          // notification.send({
          //   message: "Alreay you registered please signin for continue",
          // });
        } else {
          const message = await new Message({ ...req.body });
          message.save();

          const token = await Jwt.sign(
            { user: message },
            process.env.SECRET_KEY
          );
          return res.status(200).send({
            message: excrypt(token),
            data: excrypt(message),
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "failed" });
      }
    }
  }
}
