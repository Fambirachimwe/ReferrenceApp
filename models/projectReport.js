import { Schema } from "mongoose";
import Report from "./report.js";

const projectReportSchema = new Schema({
    projectNumber: Number
});

const ProjectReport = Report.discriminator('ProjectReport', projectReportSchema);

export default ProjectReport;



