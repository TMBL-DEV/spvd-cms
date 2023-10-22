import * as server from '../../utils/serverStrapi';
import * as blogType from '../../../types/blog';
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
    Strapi4ResponseSingle,
} from '@nuxtjs/strapi/dist/runtime/types';
import { useStrapiQL } from '../../utils/graphqlStrapi';
import { HOMEPAGE_QUERY } from '../../../utils/graphql/queries/homePageQuery';

export default defineEventHandler(async (event) => {
    //  const { data } = useFetch('/api/home-page');
    const client = useStrapiQL();

    type AboutUsContentSections = {
        id: string;
        heading: string;
        paragraph: string;
        optionalMedia: MediaItem;
    };

    type MediaItem = {
        data: {
            attributes: {
                url: string,
                alternativeText: string
            }
        }
    }

    type homePageType = {
        homePage: {
            data: {
                attributes: {
                    title: string;
                    aboutUsContentSections: AboutUsContentSections[];
                    mainPoint: MediaItem
                };
            };
        } | null;
    };


    return client<homePageType>(HOMEPAGE_QUERY);
});
