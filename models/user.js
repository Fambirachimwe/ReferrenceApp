import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    role: { type: String, default: "user" }
});

const User = model('User', userSchema);

export default User