import * as server from '../../utils/serverStrapi';
import * as blogType from '../../../types/blog';
import { Strapi4ResponseMany } from '@nuxtjs/strapi/dist/runtime/types';

export default defineEventHandler(async (event) => {
    // const response = await server.useStrapiFetch<Strapi4ResponseMany<blogType.blog>>('blogs');
    // return response;
});
