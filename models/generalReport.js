import { Schema } from 'mongoose'
import Report from './report.js';

const generalReportSchema = new Schema({
    department: String
});

const GeneralReport = Report.discriminator('GeneralReport', generalReportSchema);

export default GeneralReport