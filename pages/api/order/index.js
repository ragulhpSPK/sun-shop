import dbconnect from "@/connection/conn";
import Order from "../../../models/order";

export default async function orderController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        const order = await Order.find();
        return res.status(200).send({ data: order });
      } catch (err) {
        return res.status(500).send({ data: "failed" });
      }
    }

    case "POST": {
      console.log("body", req.body);
      try {
        const order = await new Order({ ...req.body.data });
        const result = order.save();
        return res.status(200).send({ message: result });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
    }

    case "PUT": {
      try {
        const order = await Order.findByIdAndUpdate(
          { _id: req.body._id },
          req.body.data
        );
        return res.status(200).send({ message: order });
      } catch (errr) {
        return res.status(500).send({ message: "failed" });
      }
    }
  }
}