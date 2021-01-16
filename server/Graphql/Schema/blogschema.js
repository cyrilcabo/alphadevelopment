const blogSchema = `
	type BlogSummary {
		_id: ID!
		title: String!
		image: String
		category: [String!]!
		featured: Boolean!
		datePosted: Date!
		rating: Float!
		totalRatings: Int!
	}
	type Blog {
		_id: ID!
		title: String!
		author: String!
		category: [String!]!
		featured: Boolean!
		datePosted: Date!
		rating: Float!
		totalRatings: Int!
		content: String!
		series: [String]
		iRating: Int!
	}
	type BlogLike {
		success: Boolean
		iRating: Int
		upsert: Int
		prev: Int
	}
	type BlogComment {
		_id: ID
		name: String
		comment: String
		datePosted: Date
	}
`;

module.exports = blogSchema;