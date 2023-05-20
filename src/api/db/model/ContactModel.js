import mongoose from "mongoose"
import ContactSchema from "../schema/ContactSchema"

const ContactModel = mongoose.modelNames().includes("contact")
  ? mongoose.model("contact")
  : mongoose.model("contact", ContactSchema)

export default ContactModel
