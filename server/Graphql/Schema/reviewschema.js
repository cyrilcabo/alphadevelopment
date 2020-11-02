const reviewSchema = `
	type Like {
		success: Boolean!
		_id: String
		name: String
		msg: String
		rating: Int
	}

	type Review {
		_id: String!
		name: String
		msg: String
		rating: Int!
		datePosted: Date
	}

	type IsReviewed {
		success: Boolean!
		_id: String
		rating: Int
		name: String
		msg: String
		datePosted: Date
	}

	scalar Date
`;

module.exports = reviewSchema;