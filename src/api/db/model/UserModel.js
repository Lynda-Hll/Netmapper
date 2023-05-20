import mongoose from "mongoose"
import UserSchema from "../schema/UserSchema"

const UserModel = mongoose.modelNames().includes("user")
  ? mongoose.model("user")
  : mongoose.model("user", UserSchema)

export default UserModel
