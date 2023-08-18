import { ContentEntry, DateFields } from "./strapi";

interface blogAttributes extends DateFields {
    content: string;
}

type blog = blogAttributes;

export { blog };