import ContactModel from "@/api/db/model/ContactModel"
import mw from "@/api/mw"

const handler = mw({
  POST: [
    async (req, res) => {
      const { nom, prenom, mail, message } = req.body

      await ContactModel.create({
        date: new Date(),
        nom,
        prenom,
        mail,
        message,
      })
      res.send({ result: "succes" })
    },
  ],
  GET: [
    async (req, res) => {
      const { nom, prenom, mail, message } = req.query
      const stock = await ContactModel.find({
        nom: { $eq: nom },
        prenom: { $eq: prenom },
        mail: { $eq: mail },
        message: { $eq: message },
      })
      res.send({ result: stock })
    },
  ],
})

export default handler
