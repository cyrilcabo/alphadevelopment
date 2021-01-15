import gql from 'graphql-tag';

export const LIKEBLOG = gql`
	mutation ($blog: ID!, $prev: Int, $rating: Int!) {
		likeBlog (blog: $blog, prev: $prev, rating: $rating) {
			success,
			iRating,
			upsert,
			prev
		}
	}
`;

export const ADDCOMMENT = gql`
	mutation ($_id: ID!, $comment: String!, $name: String) {
		addComment (_id: $_id, name: $name, comment: $comment) {
			_id,
			name,
			comment,
			datePosted
		}
	}
`; 