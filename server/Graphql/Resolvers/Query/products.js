const products = (parent, args, context) => {
	const limit = args.featured ?2 :12;
	const skip = args.skip || 0;
	return context.db.then(db => db.collection("products_summary").find().sort({featured: -1}).skip(skip).limit(limit).toArray()).then(arr => {
		return arr.map(item => ({...item, rating: item.totalRating/item.reviews || 0}))
	});
}

module.exports = products;