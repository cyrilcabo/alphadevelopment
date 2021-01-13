const {ObjectId} = require('mongodb');

const Blog = (parent, args, context) => {
	if (args._id) {
		return context.db.then(db => {
			return db.collection('blogs').aggregate([
				{
					$match: {
						_id: ObjectId(args._id)
					}	
				},
				{
					$lookup: {
						from: "blog_ratings",
						let: {
							args_id: "$_id",
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{$eq: ["blog_id", ObjectId(args._id)]},
											{$eq: ["user_id", context.request.signedCookies["alpha_id"]]}
										]
									}
								}
							}
						],
						as: "blogRatings"
					},
				},
				{
					$replaceRoot: {
						newRoot: {
							$mergeObjects: [
								{
									$arrayElemAt: ["$blogRatings", 0]
								},
								"$$ROOT"
							]
						}
					}
				},
				{
					$project: {
						userId: 0,
						blogRatings: 0,
					}
				},
				{
					$addFields: {
						iRating: {
							$ifNull: ["$iRating", 0]
						},
						rating: {
							$divide: ["$rating", "$totalRatings"]
						}
					}
				}
			]).toArray();
		}).catch(e => {
			console.log("Error occured when fetching blog.", e);
			throw new Error("Something unexpected occured. Please check your input.");
		});
	} else {
		throw new Error("Empty ID.");
	}
}

module.exports = Blog;