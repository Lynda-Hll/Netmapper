import { Schema } from "mongoose"

const ScanSchema = new Schema({
  uidUser: { type: String },
  date: { type: Date, required: true },
  ip: { type: String, required: true },
  option: { type: String, required: true },
  optionAnalyse: { type: String, required: true },
  time: { type: String },
  number: { type: String },
  port: { type: String },
  result: { type: String, required: true },
})

export default ScanSchema
