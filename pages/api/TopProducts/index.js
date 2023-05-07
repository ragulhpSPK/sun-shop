import dbconnect from "@/connection/conn";
import TopProductSchema from "../../../models/topProducts"

export default async function topProductsController(req, res) {
    dbconnect()
    switch (req.method) {
        case "GET": {
            try {
                const result = await TopProductSchema.find()
                return res.status(200).send({message:result})
            } catch (err) {
                return res.status(500).send({message:"failed"})
            }
        } case "POST": {
            try {
                const top = new TopProductSchema({ ...req.body })
                const result=await top.save()
                return res.status(200).send({message:result})
            } catch(err) {
                return res.status(500).send({message:"failed"})
            }
        }
    }
}