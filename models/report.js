import { Schema, model } from 'mongoose'

const reportSchema = new Schema({
    title: String,
    referenceNumber: String,
    year: Number,
    createdBy: String,
    // rtype: String

}, {
    _id: true,
    discriminatorKey: 'type',
    timestamps: true,
});



const Report = model('report', reportSchema);

export default Report