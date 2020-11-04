const querySchema = `
	type Query {
		products(featured: Boolean, skip: Int): [ProductSummary]!
		product(pid: String!): Product!
		reviews(pid: String!, skip: Int, excl: String): [Review]!
		isReviewed(pid: String!): IsReviewed!
		testimonials(featured: Boolean, skip: Int): [Testimonial]!
	}
`;

module.exports = querySchema;