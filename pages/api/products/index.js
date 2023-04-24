import dbconnect from "@/connection/conn";
import Product from "@/models/product";

export default async function productController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find();
        return res.status(200).send({ data: products });
      } catch (err) {
        return res.status(500).send({ message: "failed" });
      }
      break;
    case "POST":
      try {
        console.log("BODY", req.body);
        const product = new Product({ ...req.body });
        console.log("lklj", product);
        const result = await product.save();
        console.log("result", result);

        return res.status(200).send({ data: result });
      } catch (err) {
        return res.status(400).send({ message: "failed" });
      }
      break;

    case "PUT":
      try {
        console.log("trigered", req.body);
        const product = await Product.findByIdAndUpdate(
          { _id: req.body.id },
          req.body.data
        );
        return res.status(200).send({ data: product });
      } catch (err) {
        return res.status(400).send({ message: "failed" });
      }
      break;
  }
}
