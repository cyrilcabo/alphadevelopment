const {ObjectId} = require('mongodb');
const database = require('../database/index');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//This is just a temporary solution, as making a full-blown content-manager is not feasible at the moment.

router.use(bodyParser.json({type: "application/json"}));

router.post('/postblog', async (req, res) => {
	const {
		password, 
		content, 
		title, 
		thumbnail, 
		category,
		author,
		featured, 
	} = req.body;
	if (password !== process.env.ADMIN_PASSWORD) {
		res.status(400);
		res.json({success: false, msg: "Wtf are you doing? Get outta here!"});
	} else {
		const dateNow = Date.now(), id = ObjectId();
		database().then(async (db) => {
			await db.collection("blogs_summary").insertOne({
				title,
				image: thumbnail,
				category,
				featured,
				rating: 0,
				totalRatings: 0,
				datePosted: dateNow,
				_id: ObjectId(id)
			});
			await db.collection("blogs").insertOne({
				title,
				category,
				featured,
				rating: 0,
				totalRatings: 0,
				datePosted: dateNow,
				_id: ObjectId(id),
				content,
				author
			});
		}).then(() => {
			res.json({success: true, msg: "All goods, posted!"});
		}).catch(err => {
			res.json({success: false, msg: "Something went wrong."});
		});
	}
});

module.exports = router;