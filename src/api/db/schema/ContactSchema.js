import { Schema } from "mongoose"

const ContactSchema = new Schema({
  nom: { type: String },
  prenom: { type: String },
  mail: { type: String },
  message: { type: String },
})

export default ContactSchema
