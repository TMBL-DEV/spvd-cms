import { useStrapiFetch } from '../server/utils/serverStrapi';
import * as blogType from '../types/blog';

const notFound = () => {
    return showError({
        statusCode: 404,
        statusMessage: 'gezochte nieuws item is niet aanwezig',
    });
};

export default defineNuxtRouteMiddleware(async (to, from) => {
    const friendlyUrl: string = to.path.replace('/news/', '');
    
    if (!friendlyUrl.length) {
        return notFound();
    }

    const { data, error } = await useFetch(`/api/blogs/${friendlyUrl}`);
    
    if(data.value?.blog === null){
        return notFound();
    }

    useState(friendlyUrl).value = data.value?.blog;
});
