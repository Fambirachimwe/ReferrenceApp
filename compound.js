import { Schema, Types, model } from "mongoose";

const letterSchema = new Schema({
    title: String,
    createdBy: { type: Types.ObjectId, ref: 'User' },
    referrenceNumber: String,
    year: Number
}, {
    _id: true,
    discriminatorKey: 'type',
    timestamps: true,

});


const Letter = model('Letter', letterSchema);

const generalLetterSchema = new Schema({
    department: String
});


const GeneralLetter = Letter.discriminator('GeneralLetter', generalLetterSchema);



const projectLetterSchema = new Schema({
    projectNumber: Number
});



const ProjectLetter = Letter.discriminator('ProjectLetter', projectLetterSchema);