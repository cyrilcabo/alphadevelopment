const {ObjectId} = require('mongodb');

const reviews = (parent, args, context) => {
	const skip = args.skip || 0;
	return context.db.then(db => db.collection("reviews").find({user_id: {$ne: context.request.signedCookies["alpha_id"]},product_id: ObjectId(args.pid)}).sort({datePosted: -1}).skip(skip).limit(12).toArray());
};

module.exports = reviews;