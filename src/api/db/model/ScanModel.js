import mongoose from "mongoose"
import ScanSchema from "../schema/ScanSchema"

const ScanModel = mongoose.modelNames().includes("scan")
  ? mongoose.model("scan")
  : mongoose.model("scan", ScanSchema)

export default ScanModel
