import dbconnect from "@/connection/conn";
import Product from "../../../models/product";

export default async function productsController(req, res) {
  dbconnect();

  switch (req.method) {
    case "GET":
      break;
    case "DELETE":
      try {
        await Product.findByIdAndDelete({ _id: req.query.id });
        return res.status(200).json({ message: "Product Deleted" });
      } catch (err) {
        return res.status(500).json({ message: "failed" });
      }
      break;
  }
}
