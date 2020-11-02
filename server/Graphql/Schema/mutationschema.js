const mutationSchema = `
	type Mutation {
		subscribe(email: String!): StatusMessage!
		like(productId: String!, name: String, msg: String, rating: Int!, id: String): Like!
	}
`;

module.exports = mutationSchema;