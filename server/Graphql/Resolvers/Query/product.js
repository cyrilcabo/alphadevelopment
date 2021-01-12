const product = (parent, args, context) => {
	return context.db.then(db => db.collection("products").findOne({pid: args.pid})).then(result => {
		return {
			...result,
			rating: result.totalRating/result.reviews || 0,
		}
	});
};

module.exports = product;