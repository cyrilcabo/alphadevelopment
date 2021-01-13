import gql from 'graphql-tag';

export const TESTIMONIALS = gql`
  query TESTIMONIALS ($featured: Boolean, $skip: Int) {
    testimonials (featured: $featured, skip: $skip) {
      _id,
      name,
      content,
      image,
      project,
      featured
    }
  }
`;