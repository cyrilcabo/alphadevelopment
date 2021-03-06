import gql from 'graphql-tag';

export const BLOGS = gql`
	query($title: String, $skip: Int, $category: [String], $limit: Int, $featured: Boolean, $hot: Boolean, $exclude: ID) {
		blogs(title: $title, skip: $skip, category: $category, limit: $limit, featured: $featured, hot: $hot, exclude: $exclude) {
			_id,
			title,
			rating,
			category,
			image,
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
			series {
				title,
				links {
					_id,
					title
				}
			},
			iRating
		}
	}
`;

export const BLOG_COMMENTS = gql`
	query($_id: ID!, $skip: Int) {
		blogComments(_id: $_id, skip: $skip) {
			_id,
			comment,
			name,
			datePosted
		}
	}
`;