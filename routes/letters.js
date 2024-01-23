import express from 'express';
import { Types } from 'mongoose';
import Letter from '../models/letter.js'; // Replace with the correct path to your Mongoose model
import GeneralLetter from '../models/generalLetter.js';
import ProjectLetter from '../models/projectLetter.js';
import { generateGeneralLetterNumber, generateProjectLetterNumber } from '../util/util.js';



const router = express.Router();

// Create a new letter
router.post('/general-letters', async (req, res) => {

    const letters = await Letter.find();
    const letterLength = letters.length;

    // referrence
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    const reference = generateGeneralLetterNumber(req.body.department, letterLength, req.body.createdBy)

    try {
        const generalLetter = new GeneralLetter({
            title: req.body.title,
            createdBy: req.body.createdBy,
            referrenceNumber: reference,
            year: currentYear,
            department: req.body.department,
        });

        const savedLetter = await generalLetter.save();
        res.json(savedLetter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/project-letters', async (req, res) => {

    const letters = await Letter.find();
    const letterLength = letters.length;

    // referrence
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    const reference = generateProjectLetterNumber(req.body.projectNumber, letterLength, req.body.createdBy)
    try {
        const projectLetter = new Letter({
            title: req.body.title,
            createdBy: req.body.createdBy,
            referrenceNumber: reference,
            year: currentYear,
            projectNumber: req.body.projectNumber,
        });

        const savedLetter = await projectLetter.save();
        res.json(savedLetter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all letters
router.get('/', async (req, res) => {
    try {
        const letters = await Letter.find().populate('createdBy');
        res.json(letters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific letter
router.get('/:id', async (req, res) => {
    try {
        const letter = await Letter.findById(req.params.id).populate('createdBy');
        res.json(letter);
    } catch (err) {
        res.status(404).json({ message: 'Letter not found' });
    }
});

// Update a letter
router.put('/:id', async (req, res) => {
    try {
        const updatedLetter = await Letter.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                createdBy: req.body.createdBy,
                referrenceNumber: req.body.referrenceNumber,
                year: req.body.year,
                department: req.body.department, // Only for GeneralLetter
                projectNumber: req.body.projectNumber, // Only for ProjectLetter
            },
            { new: true }
        ).populate('createdBy');

        res.json(updatedLetter);
    } catch (err) {
        res.status(404).json({ message: 'Letter not found' });
    }
});

// Delete a letter
router.delete('/:id', async (req, res) => {
    try {
        await Letter.findByIdAndDelete(req.params.id);
        res.json({ message: 'Letter deleted' });
    } catch (err) {
        res.status(404).json({ message: 'Letter not found' });
    }
});

export default router;
