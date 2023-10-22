import * as server from '../../utils/serverStrapi';
import * as blogType from '../../../types/blog';
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
    Strapi4ResponseSingle,
} from '@nuxtjs/strapi/dist/runtime/types';
import { BLOGS_BY_FRIENDLY_URL } from '../../../utils/graphql/blogByFriendlyUrlQuery';

export default defineEventHandler(async (event) => {
    const client = useStrapiQL();
    const friendlyUrl = event.path.replace('/api/blogs/', '');

    const res = await client(BLOGS_BY_FRIENDLY_URL, {
        slug: friendlyUrl,
    });

    const blogs: unknown[] = res.blogs.data;
    if (blogs.length) {
        return {
            blog: blogs[0],
        };
    }

    return {
        blog: null,
    };
});
