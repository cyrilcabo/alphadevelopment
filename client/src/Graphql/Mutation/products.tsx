import gql from 'graphql-tag';

export const LIKE = gql`
	mutation like ($pId: String!, $name: String, $msg: String, $rating: Int!, $id: String, $prev: Int) {
		like (productId: $pId, name: $name, msg: $msg, rating: $rating, id: $id, prev: $prev) {
			success,
			_id,
			name,
			msg,
			rating,
			prev,
			new
		}
	}
`;