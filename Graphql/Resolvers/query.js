const {ObjectId} = require('mongodb');

const Query = {
	products: async (parent, args, context) => {
		if (args.featured) return await context.db.then(db => db.collection("products").find({featured: true}).toArray());
		if (args.exclude) return await context.db.then(db => db.collection("products").find({
			_id: {
				$nin: args.exclude.map(item => ObjectId(item)),
			}
		}).toArray());
		return await context.db.then(db => db.collection('products').find().toArray());
	},
}

module.exports = {
	Query,
}