import * as server from '../../utils/serverStrapi';
import * as blogType from '../../../types/blog';
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
    Strapi4ResponseSingle,
} from '@nuxtjs/strapi/dist/runtime/types';

export default defineEventHandler(async (event) => {
    const friendlyUrl = event.path.replace('/api/blogs/', '');

    const { data, error } = await server.useStrapiFetch().get<blogType.blog[]>(
        '/blogs',
        {
            'filters[friendlyUrl][$eq]': friendlyUrl,
            'populate[0]': 'thumbnail'
        }
    );

    if (error) {
        throw error;
    }

    return data;
});