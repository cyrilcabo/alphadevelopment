const testimonials = (parent, args, context) => {
	if (args.featured) return context.db.then(db => db.collection("testimonials").find({featured: true}).toArray());
	return context.db.then(db => db.collection("testimonials").find().sort({featured: -1}).skip(args.skip || 0).limit(10).toArray());
}

module.exports = testimonials;