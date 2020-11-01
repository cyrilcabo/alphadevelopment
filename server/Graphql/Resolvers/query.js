const {ObjectId} = require('mongodb');

const Query = {
	products: async (parent, args, context) => {
		if (args.featured) return await context.db.then(db => db.collection("products_summary").find({featured: true}).toArray());
		const skip = args.skip || 0;
		return await context.db.then(db => db.collection("products_summary").find().sort({featured: -1}).skip(skip).limit(12).toArray());;
	},
	product: async (parent, args, context) => {
		return await context.db.then(db => db.collection("products").findOne({pid: args.pid}));
	}
}

module.exports = {
	Query,
}