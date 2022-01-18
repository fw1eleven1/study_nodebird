const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

// /user/login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (info) {
			return res.status(401).send(info.reason);
		}
		return req.login(user, async loginErr => {
			if (loginErr) {
				console.err(loginErr);
				return next(loginErr);
			}
			return res.status(200).json(user);
		});
	})(req, res, next);
});

router.post('/logout', (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.status(200).send('OK');
});

// /user
router.post('/', async (req, res, next) => {
	try {
		const exUser = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (exUser) {
			return res.status(403).send('already exist email');
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 12);
		await User.create({
			email: req.body.email,
			nickname: req.body.nickname,
			password: hashedPassword,
		});
		// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.status(201).send('OK');
	} catch (error) {
		console.log(error);
		next(error); // 500 error
	}
});

module.exports = router;
