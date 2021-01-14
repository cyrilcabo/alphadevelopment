import gql from 'graphql-tag';

export const SUBSCRIBE = gql`
  mutation subscribe ($email: String!) {
    subscribe (email: $email) {
      error,
      message,
    }
  }
`;

export const CONTACT = gql`
	mutation contact ($contact: String!, $message: String!) {
		contact (contact: $contact, message: $message) {
			error,
			message
		}
	}
`;