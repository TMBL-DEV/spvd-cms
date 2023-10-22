import { gql } from "graphql-tag"

const BLOGS_INDEX_QUERY = gql`
query blogs{
    blogs{
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

 export { BLOGS_INDEX_QUERY }