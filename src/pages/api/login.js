import UserModel from "@/api/db/model/UserModel"
import mw from "@/api/mw"
import { v4 as uuid } from "uuid"

const handler = mw({
  POST: [
    async (req, res) => {
      const { nom, prenom, mail, password } = req.body

      await UserModel.create({
        date: new Date(),
        uid: uuid(),
        nom,
        prenom,
        mail,
        password,
      })
      res.send({ result: "success" })
    },
  ],
  GET: [
    async (req, res) => {
      const { login, password } = req.query
      const m = decodeURIComponent(login)
      const user = await UserModel.find({
        password: { $eq: password },
        mail: { $eq: m.trim() },
      })
      res.send({ result: user })
    },
  ],
})

export default handler
