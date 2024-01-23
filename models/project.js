import { Schema, Types, model } from "mongoose";

const projectSchema = new Schema({
    jobNumber: { type: String },
    project_name: { type: String, required: true },
    location: { type: String, },
    scope: { type: String, },
    client: { type: String },
});

const Project = model('Project', projectSchema);

export default Project;