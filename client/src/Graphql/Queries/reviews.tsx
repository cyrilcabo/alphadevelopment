import gql from 'graphql-tag';

export const REVIEWS = gql`
  query REVIEWS ($skip: Int, $pid: String!, $excl: String) {
    reviews (pid: $pid, skip: $skip, excl: $excl) {
      _id,
      name,
      msg,
      rating,
      datePosted
    }
  }
`;

export const IS_REVIEWED = gql`
  query IS_REVIEWED ($pid: String!) {
    isReviewed (pid: $pid) {
      success,
      name,
      msg,
      rating,
      datePosted,
      _id
    }
  }
`;