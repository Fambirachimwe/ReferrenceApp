import { Schema } from "mongoose";
import Letter from "./letter.js";


const projectLetterSchema = new Schema({
    projectNumber: Number
});



const ProjectLetter = Letter.discriminator('ProjectLetter', projectLetterSchema);

export default ProjectLetter;