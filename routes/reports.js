import express from 'express';
import Report from '../models/report.js'; // Replace with the correct path to your Mongoose model
import GeneralReport from '../models/generalReport.js';
import ProjectReport from '../models/projectReport.js';
import { generateGeneralReportNumber, generateProjectReportNumber } from '../util/util.js';

const router = express.Router();

// Create a new report
router.post('/project-reports', async (req, res) => {
    const reports = await Report.find();
    const reportsLength = reports.length;
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    const reference = generateProjectReportNumber(req.body.projectNumber, reportsLength)

    try {
        const projectReport = new ProjectReport({
            title: req.body.title,
            referenceNumber: reference,
            year: currentYear,
            projectNumber: req.body.projectNumber,
            createdBy: req.body.createdBy
        });

        const savedReport = await projectReport.save();
        res.json(savedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/general-reports', async (req, res) => {

    const reports = await Report.find();
    const reportsLength = reports.length;

    const reference = generateGeneralReportNumber(req.body.department, reportsLength)
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    try {
        const generalReport = new GeneralReport({
            title: req.body.title,
            referenceNumber: reference,
            year: currentYear,
            department: req.body.department,
            createdBy: req.body.createdBy
        });

        const savedReport = await generalReport.save();
        res.json(savedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific report
router.get('/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        res.json(report);
    } catch (err) {
        res.status(404).json({ message: 'Report not found' });
    }
});

// Update a report
router.put('/:id', async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                referenceNumber: req.body.referenceNumber,
                year: req.body.year,
                department: req.body.department, // Only for GeneralReport
                projectNumber: req.body.projectNumber, // Only for ProjectReport
            },
            { new: true }
        );

        res.json(updatedReport);
    } catch (err) {
        res.status(404).json({ message: 'Report not found' });
    }
});

// Delete a report
router.delete('/:id', async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(404).json({ message: 'Report not found' });
    }
});

export default router;
