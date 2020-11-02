import gql from 'graphql-tag';

export const PRODUCTS = gql`
  query PRODUCTS ($featured: Boolean, $skip: Int){
    products (featured: $featured, skip: $skip) {
      _id,
      title,
      link,
      github,
      category,
      techs,
      featured,
      pid,
      summary,
      rating
    }
  }
`;

export const PRODUCT = gql`
  query PRODUCT ($pid: String!) {
    product (pid: $pid) {
      _id,
      title,
      link,
      github,
      category,
      techs,
      images,
      featured,
      pid,
      reviews,
      rating,
      details {
        intro,
        features {
          title,
          details
        }
      }
    }
  }
`;

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