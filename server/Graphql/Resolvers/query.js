const {ObjectId} = require('mongodb');

const Query = {
	products: async (parent, args, context) => {
		const limit = args.featured ?2 :12;
		const skip = args.skip || 0;
		return context.db.then(db => db.collection("products_summary").find().sort({featured: -1}).skip(skip).limit(limit).toArray()).then(arr => arr.map(item => ({...item, rating: item.totalRating/item.reviews || 0})));
	},
	product: async (parent, args, context) => {
		const result = context.db.then(db => db.collection("products").findOne({pid: args.pid}));
		return {
			...result,
			rating: result.totalRating/result.reviews || 0,
		}
	},
	reviews: async (parent, args, context) => {
		const skip = args.skip || 0;
		return context.db.then(db => db.collection("reviews").find({user_id: {$ne: context.request.signedCookies["alpha_id"]},product_id: ObjectId(args.pid)}).sort({datePosted: -1}).skip(skip).limit(12).toArray());
	},
	isReviewed: async (parent, args, context) => {
		return context.db.then(db => db.collection("reviews").findOne({user_id: context.request.signedCookies["alpha_id"], product_id: ObjectId(args.pid)})).then(cursor => {
			if (cursor && cursor._id) return {success: true, ...cursor};
			else return {success: false};
		}).catch(err => {
			return {success: false}
		});
	},
	testimonials: async (parent, args, context) => {
		if (args.featured) return context.db.then(db => db.collection("testimonials").find({featured: true}).toArray());
		return context.db.then(db => db.collection("testimonials").find().sort({featured: -1}).skip(args.skip || 0).limit(10).toArray());
	}
}

module.exports = {
	Query,
}