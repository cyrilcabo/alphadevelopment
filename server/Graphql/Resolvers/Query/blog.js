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
											{$eq: ["$blog_id", "$$args_id"]},
											{$eq: ["$user_id", context.request.signedCookies["alpha_id"]]}
										]
									}
								}
							}
						],
						as: "blogRatings"
					},
				},
				{
					$lookup: {
						from: "blog_series",
						let: {
							localId: "$_id"
						},
						pipeline: [
							{
								$unwind: "$links"	
							},
							{
								$match: {
									$expr: {
										$eq: ["$links._id", "$$localId"]
									}
								}
							},
							{
								$lookup: {
									from: "blog_series",
									localField: "_id",
									foreignField: "_id",
									as: "blogSeries"
								}
							},
							{
								$replaceRoot: {
									newRoot: {
										$mergeObjects: [
											"$$ROOT",
											{$arrayElemAt: ["$blogSeries", 0]},
										]
									}
								}
							},
							{
								$project: {
									blogSeries: 0
								}
							}
						],
						as: "series"
					}
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
						},
						series: {
							$ifNull: [{$arrayElemAt: ["$series", 0]}, {}]
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