import { Schema } from "mongoose";
import Letter from "./letter.js";

const generalLetterSchema = new Schema({
    department: String
});


const GeneralLetter = Letter.discriminator('GeneralLetter', generalLetterSchema);

export default GeneralLetter;

