const {ObjectId} = require('mongodb');

const blogs = (parent, args, context) => {
	return context.db.then(db => {
		if (args.title || args.date || args.category) {
			const {title, date, category} = args;
			let query = {};
			if (title) query = {...query, title: new RegExp(title, "i")};
			if (date) query = {...query, 
				datePosted: {
					$gte: date,
				}
			};
			if (category) query = {...query, 
				category: {
					$all: category,
				}
			};
			return db.collection("blogs_summary").find(query).skip(args.skip || 0).limit(10).toArray()
		}
		return db.collection("blogs_summary").find().skip(args.skip || 0).limit(10).toArray();
	}).then(result => {
		return result.map(item => {
			return {
				...item,
				rating: item.rating/item.totalRatings
			}
		});
	}).catch(err => {
		return new Error("Something went unexpected. Please try again.");
	});
};

module.exports = blogs;