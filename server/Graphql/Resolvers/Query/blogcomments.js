const {ObjectId} = require('mongodb');

const blogComments = (parent, args, context) => {
	if (args._id) {
		return context.db.then(db => {
			return db.collection("blog_comments").find({blogId: ObjectId(args._id)}).sort({datePosted: -1}).skip(args.skip || 0).limit(10).toArray();
		}).catch(err => {
			throw new Error("Something went unexpected. Please try again.");
		});
	} else {
		throw new Error ("Insufficient arguments!");
	}
}

module.exports = blogComments;