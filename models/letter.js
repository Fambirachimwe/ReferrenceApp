import { Schema, Types, model } from "mongoose";

const letterSchema = new Schema({
    title: String,
    createdBy: String,
    referrenceNumber: String,
    year: Number
}, {
    _id: true,
    discriminatorKey: 'type',
    timestamps: true,

});


const Letter = model('Letter', letterSchema);

export default Letter;
