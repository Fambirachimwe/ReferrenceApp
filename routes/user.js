import 'dotenv/config.js'
import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();


// get all users 
router.get('/', (req, res, next) => {
    User.find().then(data => {
        if (data.length > 0) {
            res.json({
                users: data
            })
        } else {
            res.json({
                users: []
            })
        }
    })
});


// get user by Id
router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    User.findById(id).then(data => {
        if (data) {
            res.send(data)
        } else {
            res.send('user not found')
        }
    })
});


// user signup 
router.post('/signup', (req, res) => {

    const { firstname, lastname, password, email, department } = req.body;

    User.findOne({ "email": email }).then(data => {
        if (data) {
            console.log(data)
            res.status(401).send("Email already taken")
        } else {
            bcrypt.hash(password, 10).then(function (hash) {
                // Store hash in your password DB.
                new User({
                    firstname, lastname,
                    email: email,
                    department: department,
                    password: hash
                }).save()
                    .then(data => {
                        res.send(data)
                    })
            });

        }
    })
});


// user login

router.post('/login', (req, res) => {

    const { email, password } = req.body;
    User.findOne({ "email": email }).then(data => {

        // console.log(data)
        if (data) {
            // console.log("user found in the database ")

            // console.log(data)

            bcrypt.compare(password, data.password, function (err, result) {

                if (err) return res.sendStatus(401);
                if (result) {
                    const accessToken = jwt.sign(
                        {
                            username: data.username,
                            id: data._id, email:
                                data.email
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "1d"
                        }
                    );

                    res.status(200).json({
                        accessToken: `${accessToken}`,
                        userId: data._id,
                        department: data.department,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        role: data.role

                    })

                } else {
                    res.sendStatus(401);
                }
            });

        } else {
            res.status(401).json({
                message: "unauthorized"
            })  // unauthorized 
        }
    })
})












export default router;
