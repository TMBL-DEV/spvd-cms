import * as server from '../../utils/serverStrapi';
import * as blogType from '../../../types/blog';
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
    Strapi4ResponseSingle,
} from '@nuxtjs/strapi/dist/runtime/types';
import superjson from 'superjson'
import { BLOGS_INDEX_QUERY } from '../../../utils/graphql/queries/blogsIndexQuery';


export default defineEventHandler(async (event) => {
    // const friendlyUrl = event.path.replace('/api/blogs/', '');
    const client = useStrapiQL();

    return client(BLOGS_INDEX_QUERY);
});
