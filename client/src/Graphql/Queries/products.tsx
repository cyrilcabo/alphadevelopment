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