import { Strapi4ResponseData } from "@nuxtjs/strapi/dist/runtime/types";
import { ContentDateField, ContentEntry, DateFields, MediaData } from "./strapi";
type contentDateFields =  DateFields & ContentDateField;
interface blogAttributes  {
    thumbnail: null|{ data: Strapi4ResponseData<MediaData> };
    title: string;
    shortDescription: string;
    friendlyUrl: string;
    content: string;
}

type blog = blogAttributes & contentDateFields;

export { blog, blogAttributes };