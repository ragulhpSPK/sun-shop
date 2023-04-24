import dbconnect from "@/connection/conn";
import Banner from "../../../models/banner";

export default async function bannerController(req, res) {
  dbconnect();
  switch (req.method) {
    case "GET": {
      try {
        const banner = await Banner.find();
        res.status(200).send({ data: banner });
      } catch (err) {
        res.status(500).send({ message: "failed" });
      }
    }

    case "POST": {
      try {
        const Banner = await createBanner({ ...req.body });
        const result = Banner.save();
        res.status(200).send({ data: result });
      } catch (err) {
        res.status(500).send({ message: "failed" });
      }
    }
  }
}
