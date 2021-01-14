const blogSchema = `
	type BlogSummary {
		_id: ID!
		title: String!
		category: [String!]!
		featured: Boolean!
		datePosted: Date!
		rating: Int!
		totalRatings: Int!
	}
	type Blog {
		_id: ID!
		title: String!
		author: String!
		category: [String!]!
		featured: Boolean!
		datePosted: Date!
		rating: Int!
		totalRatings: Int!
		content: String!
		series: [String]
		iRating: Int!
	}
	type BlogLike {
		success: Boolean
		iRating: Int
		upsert: Int
	}
	type BlogComment {
		_id: ID
		name: String
		comment: String
		datePosted: Date
	}
`;

module.exports = blogSchema;