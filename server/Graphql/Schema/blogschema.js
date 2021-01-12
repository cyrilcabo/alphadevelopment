const blogSchema = `
	type BlogSummary {
		_id: ID!
		title: String!
		category: [String!]!
		datePosted: Date!
	}
`;

module.exports = blogSchema;