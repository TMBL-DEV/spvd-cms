import { gql } from "graphql-tag"

const BLOGS_BY_FRIENDLY_URL = gql`
query pageBySlug($slug: String){
    blogs(filters:{ friendlyUrl: { eq: $slug }}){
      data {
        id,
        attributes {
          title
          shortDescription
          friendlyUrl
          content
          thumbnail {
            data {
              id
              attributes {
                formats
                name
                alternativeText
                caption
                url
                previewUrl
              }
            }
          }
          createdAt
        }
      }
   }
 }`

 export { BLOGS_BY_FRIENDLY_URL }