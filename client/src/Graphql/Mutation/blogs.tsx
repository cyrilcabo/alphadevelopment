import gql from 'graphql-tag';

export const LIKEBLOG = gql`
	mutation ($blog: ID!, $prev: Int, $rating: Int!) {
		likeBlog (blog: $blog, prev: $prev, rating: $rating) {
			success,
			iRating,
			upsert
		}
	}
`; 