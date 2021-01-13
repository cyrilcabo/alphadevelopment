const {ObjectId} = require('mongodb');

const likeBlog = (parent, args, context) => {
	if (!args.blog || !args.rating) throw new Error("Incomplete arguments.");

	return context.db.then(db => db.collection('blog_ratings').updateOne({_id: args._id ?ObjectId(args._id) :ObjectId()}, {
		$set: {
			iRating: args.rating,
			blog_id: ObjectId(args.blog), 
			user_id: context.request.signedCookies["alpha_id"]
		}
	}, {upsert: true})).then((cursor) => {
		const inc = cursor.upsertedId && cursor.upsertedId._id ?1 : 0;
		if (!inc && !args.prev) throw new Error("Invalid arguments!");
		context.db.then(async (db) => {	
			await db.collection('blogs_summary').updateOne({_id: ObjectId(args.blog)}, {
				$inc: {
					totalRatings: inc,
					rating: args.rating-(args.prev || 0)
				}
			});
			await db.collection('blogs').updateOne({_id: ObjectId(args.blog)}, {
				$inc: {
					totalRatings: inc,
					rating: args.rating-(args.prev || 0)
				}
			});
		});
	}).then(() => {
		return {
			success: true,
			iRating: args.rating,
		}
	}).catch(err => {
		console.log("Error occured while liking blog.", err);
		throw new Error("Something went wrong. Please try again.");
	});
}

module.exports = likeBlog;