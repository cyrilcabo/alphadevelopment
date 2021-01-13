const mutationSchema = `
	type Mutation {
		subscribe(email: String!): StatusMessage!
		like(productId: String!, name: String, msg: String, rating: Int!, prev: Int, id: String): Like!
		contact(contact: String!, message: String!): StatusMessage!
		likeBlog(prev: Int, rating: Int!, blog: ID!): BlogLike
		addComment(_id: ID!, comment: String!, name: String): BlogComment
	}
`;

module.exports = mutationSchema;