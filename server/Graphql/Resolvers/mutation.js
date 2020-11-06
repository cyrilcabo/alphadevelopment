const {ObjectId} = require('mongodb');

const Mutation =  {
	subscribe: (parent, args, context) => {
		return context.db.then(db => db.collection("subscribed_emails").insertOne({_id: args.email})).then(() => {
			return context.send(args.email, 1).then(info => {
				if (info.accepted.length) {
					return response = {
						error: false,
						message: "Email subscribed succesfully!"
					};
				}
				return response = {
					error: true,
					messsage: "Something went wrong. Try again.",
				};
			}).catch(err => {
				return response = {
					error: true,
					message: "Service currently unavailable.",
				};
			});
		}).catch(err => {
			if (err) return {
				error: true,
				message: "Email already subscribed!",
			}
		});
	},
	like: (parent, args, context) => {
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
	},
	contact: (parent, args, context) => {
		if (!args.contact || !args.message) return {error: true, message: "All fields required!"}
		return context.send(null, 2, args.contact, args.message).then(info => {
			if (info.accepted.length) {
				return {
					error: false,
					message: "Message succesfully sent."
				}
			}
			return {
				error: true,
				message: "Something went wrong.",
			}
		}).catch (err => ({error: true, message: "Service unavailable."}));
	}
}

module.exports = {
	Mutation,
}