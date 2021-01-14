import gql from 'graphql-tag';

export const BLOGS = gql`
	query($title: String, $skip: Int, $category: [String]) {
		blogs(title: $title, skip: $skip, category: $category) {
			_id,
			title,
			rating,
			category,
			totalRatings,
			datePosted
		}
	}
`;

export const BLOG = gql`
	query($_id: ID!) {
		blog(_id: $_id) {
			_id,
			title,
			author,
			category,
			featured,
			datePosted,
			rating,
			totalRatings,
			content,
			series,
			iRating
		}
	}
`;

export const BLOG_COMMENTS = gql`
	query($_id: ID!) {
		blogComments(_id: $_id) {
			_id,
			comment,
			name,
			datePosted
		}
	}
`;