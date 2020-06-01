const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin');

//Home route
router.get('/', (req, res) => {
	res.send('hello');
});

router.get('/protected', requireLogin, (req, res) => {
	res.send('hello user');
});

//Signup route
router.post('/signup', (req, res) => {
	const { name, email, password } = req.body;
	if (!email || !password || !name) {
		return res.status(422).json({ error: 'please add all the details' });
	} else {
		User.findOne({ email: email }).then((savedUser) => {
			if (savedUser) {
				return res.status(422).json({ error: 'User already exists' });
			}

			// password hashing
			bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						email,
						password: hashedPassword,
						name,
					});
					user
						.save()
						.then((user) => {
							res.json({ message: 'saved successfully' });
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
});

//signin route
router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: 'please provide credentials' });
	}
	User.findOne({ email: email }).then((savedUser) => {
		if (!savedUser) {
			res.status(422).json({ error: 'Invalid credentials' });
		}
		bcrypt
			.compare(password, savedUser.password)
			.then((doMatch) => {
				if (doMatch) {
					// res.json({ message: 'signed in successfully' });
					const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);
					const { _id, name, email } = savedUser;
					res.json({ token, user: { _id, name, email } });
				} else {
					return res.status(422).json({ error: 'Invalid credentials' });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

module.exports = router;
