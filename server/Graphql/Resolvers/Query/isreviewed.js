const {ObjectId} = require('mongodb'); 

const isReviewed = (parent, args, context) => {
	return context.db.then(db => db.collection("reviews").findOne({user_id: context.request.signedCookies["alpha_id"], product_id: ObjectId(args.pid)})).then(cursor => {
		if (cursor && cursor._id) return {success: true, ...cursor};
		else return {success: false};
	}).catch(err => {
		return {success: false}
	});
};

module.exports = isReviewed;