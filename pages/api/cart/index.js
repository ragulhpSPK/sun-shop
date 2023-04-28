import dbconnect from "@/connection/conn";
import Cart from "../../../models/cart";

export default async function cartController(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      {
        try {
          const cart = await Cart.find();
          return res.status(200).send({ message: cart });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;
    case "POST":
      {
        try {
          const cart = await new Cart({ ...req.body.data });
          const result = await cart.save();
          return res.status(200).send({ message: result });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;

    case "PUT":
      {
        console.log("sdfbdf", req.body);
        try {
          const cart = await Cart.findByIdAndUpdate(
            { _id: req.body.id },
            req.body
          );
          console.log("skhs", cart);
          return res.status(200).send({ data: cart });
        } catch (err) {
          return res.status(500).send({ message: "failed" });
        }
      }
      break;
  }
}