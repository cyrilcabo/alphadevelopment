const {ObjectId} = require('mongodb');

const Mutation =  {
	subscribe: async (parent, args, context) => {
		let response = {error: false, message: ""};
		await context.send(args.email).then(info => {
			if (info.accepted.length) {
				response = {
					error: false,
					message: "Email subscribed succesfully!"
				};
				return;
			}
			response = {
				error: true,
				messsage: "Something went wrong. Try again.",
			};
		}).catch(err => {
			response = {
				error: true,
				message: "Service currently unavailable.",
			};
		});
		return response;
	},
	like: async (parent, args, context) => {
		if ((args.rating < 1 || args.rating > 5) || !context.request.signedCookies["alpha_id"]) return {success: false};
		return await context.db.then(db => db.collection("reviews").updateOne({_id: args.id ?ObjectId(args.id) :ObjectId()}, {
			$set: {	
				name: args.name || "",
				rating: args.rating,
				msg: args.msg,
				user_id: context.request.signedCookies["alpha_id"],
				datePosted: Date.now(),
				product_id: ObjectId(args.productId),
			}
		}, {upsert: true})).then(async (cursor) => {
			await context.db.then(db => {
				db.collection("products").updateOne({_id: ObjectId(args.productId)}, {$inc: {reviews: 1, totalRating: args.rating}});
				db.collection("products_summary").updateOne({_id: ObjectId(args.productId)}, {$inc: {reviews: 1, totalRating: args.rating}});
			});
			return cursor;
		}).then(cursor => {
			if (cursor.modifiedCount || cursor.upsertedId._id) {
				return {
					_id: (cursor.upsertedId && cursor.upsertedId._id) || args.id,
					success: true,
					name: args.name,
					msg: args.msg,
					rating: args.rating,
				}
			} else {
				return {success: false}
			}
		}).catch(err => ({success: false}));
	}
}

module.exports = {
	Mutation,
}