const productSchema = `
	type Product {
		_id: ID!
		title: String!
		link: String!
		github: String!
		category: String!
		techs: [String]!
		images: [String]!
		featured: Boolean!
		pid: String!
		details: ProductDetails!
		reviews: Int!
		rating: Float
	}

	type ProductSummary {
		_id: ID!
		title: String!
		link: String!
		github: String!
		techs: [String!]
		category: String!
		featured: Boolean!
		pid: String!
		summary: String!
		rating: Float
	}

	type ProductDetails {
		intro: String!
		features: [ProductFeature]
	}

	type ProductFeature {
		title: String!
		details: String!
	}
`;

module.exports = productSchema;