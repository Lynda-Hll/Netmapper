import { Schema } from "mongoose"

const UserSchema = new Schema({
  date: { type: Date, required: true },
  uid: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String },
})

export default UserSchema
