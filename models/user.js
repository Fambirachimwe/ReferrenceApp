import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstname: String,
    lastName: String,
    password: String,
    email: String
});

const User = model('User', userSchema);

export default User