import gql from 'graphql-tag';

export const SKIP_PRODUCTS = gql`
	query SKIP_PRODUCTS {
		skipProducts @client
	}
`;