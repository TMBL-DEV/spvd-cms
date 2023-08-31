<template>
    <div class="bg-gradient-to-b from-green-400 via-green-300 to-white w-full">
        <article class="my-5 w-10/12 mx-auto">
            <section class="flex w-full mb-8 mt-4">
                <h1 class="text-5xl text-center mx-auto my-8">Nieuws</h1>
            </section>
            <section>
                <section v-if="pending">loading</section>
                <section v-if="data?.data">
                    <section
                        class="mx-auto w-full bg-slate-50 bg-opacity-70 border-white border-2 my-8 hover:border-green-600 cursor-pointer rounded-lg p-4 flex flex-col md:flex-row"
                        v-for="(blog, index) in data.data"
                        :key="index"
                    >
                        <img
                            class="rounded-lg mx-1 "
                            loading="lazy"
                            v-if="blog.attributes.thumbnail !== null"
                            :src="
                                getThumbnailFromMedia(blog.attributes.thumbnail)
                            "
                            :alt="
                                blog.attributes.thumbnail.data.attributes
                                    .caption
                            "
                        />
                        <div class="mx-6 flex flex-col">
                            <NuxtLink
                                :to="`/news/${blog.attributes.friendlyUrl}`"
                                class="hover:text-black"
                            >
                                <h3 class="text-xl my-2 font-semibold">
                                    {{ blog.attributes.title }}
                                </h3>
                            </NuxtLink>
                            <p class="font-think hidden md:flex">
                                {{ blog.attributes.shortDescription }}
                            </p>
                        </div>
                    </section>
                </section>
                <section v-if="!data?.data && !pending">
                    <p>Geen data gevonden</p>
                </section>
            </section>
        </article>
    </div>
</template>
<script setup lang="ts">
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
} from '@nuxtjs/strapi/dist/runtime/types';
import * as blogTypes from '../../types/blog';
import { MediaData } from '../../types/strapi';
// useStrapiMedia()
const { find } = useStrapi();

const getThumbnailFromMedia = (media: {
    data: Strapi4ResponseData<MediaData>;
}) => {
    return (
        useRuntimeConfig().public.strapiBaseUrl +
        media.data.attributes.formats.thumbnail.url
    );
};

const { data, pending, refresh, error } = await useLazyAsyncData(
    'blogs',
    () => {
        useStrapiAuth().setToken(useRuntimeConfig().public.strapiToken);
        return find<blogTypes.blog>('blogs', { populate: ['thumbnail'] });
    },
    { server: false }
);

const gotoBlog = (blog: Strapi4ResponseData<blogTypes.blog>) => {
    useRouter().push({ path: `/news/${blog.attributes.friendlyUrl}` });
};
</script>
