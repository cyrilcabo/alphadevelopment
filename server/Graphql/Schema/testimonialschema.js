const testimonialSchema = `
	type Testimonial {
		_id: String!
		name: String!
		image: String
		content: String!
		featured: Boolean!
		project: String!
	}
`;

module.exports = testimonialSchema;