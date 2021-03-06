const {ObjectId} = require('mongodb');

const like = (parent, args, context) => {
	if ((args.rating < 1 || args.rating > 5) || (args.prev && (args.prev < 1 || args.prev > 5)) || !context.request.signedCookies["alpha_id"]) return {success: false};
	return context.db.then(db => db.collection("reviews").updateOne({_id: args.id ?ObjectId(args.id) :ObjectId()}, {
		$set: {	
			name: args.name || "",
			rating: args.rating,
			msg: args.msg,
			user_id: context.request.signedCookies["alpha_id"],
			datePosted: Date.now(),
			product_id: ObjectId(args.productId),
		}
	}, {upsert: true})).then(async (cursor) => {
		const inc = cursor.upsertedId && cursor.upsertedId._id ?1 :0;	
		context.db.then(db => {
			db.collection("products").updateOne({_id: ObjectId(args.productId)}, {$inc: {reviews: inc, totalRating: args.rating-(args.prev || 0)}});
			db.collection("products_summary").updateOne({_id: ObjectId(args.productId)}, {$inc: {reviews: inc, totalRating: args.rating-(args.prev || 0)}});
		});
		return cursor;
	}).then(cursor => {
		if (cursor.modifiedCount || cursor.upsertedId._id) {
			return {
				_id: (cursor.upsertedId && cursor.upsertedId._id) || args.id,
				success: true,
				name: args.name,
				msg: args.msg,
				prev: args.prev || 0,
				rating: args.rating,
				new: !!cursor.upsertedId
			}
		} else {
			return {success: false}
		}
	}).catch(err => ({success: false}));
}

module.exports = like;