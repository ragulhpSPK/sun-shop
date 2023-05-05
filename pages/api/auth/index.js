import dbconnect from "@/connection/conn";
import Message from "@/models/message";
const twilio = require("twilio");
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function MessageController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
    }
    case "POST": {
      try {
        // const sendMessage = await client.messages.create({
        //   body: "99340",
        //   to: req.body.number,
        //   from: +17342943991,
        // });
        // console.log(sendMessage);
        const message = await new Message(req.body);
        message.save();
        res.status(200).send({ data: message });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "failed" });
      }
    }
  }
}
