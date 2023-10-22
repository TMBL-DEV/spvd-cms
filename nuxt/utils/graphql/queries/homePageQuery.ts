import { gql } from "graphql-tag"

const HOMEPAGE_QUERY = gql`
query {
    homePage {
        data {
            id
            attributes {
                title
                mainPoint {
                    data {
                        attributes {
                            alternativeText
                            url
                        }
                    }
                }
                aboutUsContentSections {
                    heading
                    paragraph
                    optionalMedia {
                        data {
                            attributes {
                                alternativeText
                                url
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

export { HOMEPAGE_QUERY }