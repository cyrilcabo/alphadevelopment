const {ObjectId} = require('mongodb');

const addComment = (parent, args, context) => {
	if (args._id || args.comment) {
		return context.db.then(db => db.collection("blog_comments").insertOne({
			blogId: ObjectId(args._id),
			name: args.name,
			comment: args.comment,
			datePosted: Date.now()
		})).then(cursor => {
			if (cursor.insertedId) return cursor.ops[0];
			else throw new Error("Something went wrong with the insertion.");
		}).catch(err => {
			console.log("Error in inserting comment.");
			throw new Error("Error in inserting comment.");
		});
	} else {
		throw new Error("Insufficient arguments!");
	}
}

module.exports = addComment;