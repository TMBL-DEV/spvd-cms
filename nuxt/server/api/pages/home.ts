import * as server from '../../utils/serverStrapi';
import * as blogType from '../../../types/blog';
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
    Strapi4ResponseSingle,
} from '@nuxtjs/strapi/dist/runtime/types';

export default defineEventHandler(async (event) => {
    // DO NOT REMOVE ITS A PERFECT EXAMPLE!!
    // const blog = await server.useStrapiFetch().get<blogType.blog>('/blogs', {
    //     'filters[friendlyUrl][$contains]': "da"

    // });
    // return blog;

    const { data, error } = await server
        .useStrapiFetch()
        .get<Strapi4ResponseData<{ aboutUs: string }>>('/home-page');

    if (error) {
        throw error;
    }

    return data;
});
