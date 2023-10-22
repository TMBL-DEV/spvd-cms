<template>
    <div class="bg-gradient-to-b from-primary to-side-color w-full">
        <article class="my-5 w-10/12 mx-auto">
            <section class="flex w-full mb-8 mt-4">
                <h1 class="text-5xl text-center mx-auto my-8 text-white">
                    Nieuws
                </h1>
            </section>
            <section>
                <section v-if="pending">loading</section>
                <section v-if="data">
                    <section
                        @click="gotoBlog(blog)"
                        class="mx-auto w-full bg-white border-white border-2 my-8 hover:border-green-600 cursor-pointer rounded-lg p-4 flex flex-col md:flex-row"
                        v-for="(blog, index) in data.blogs.data"
                        :key="index"
                    >
                        <img
                            class="rounded-lg mx-1"
                            loading="lazy"
                            v-if="blog.attributes.thumbnail !== null"
                            :src="
                                getThumbnailFromMedia(blog.attributes.thumbnail)
                            "
                            :alt="blog.attributes.thumbnail.data.attributes.alternativeText"
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
                <section v-if="!data && !pending">
                    <p>Geen Nieuws</p>
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

const getThumbnailFromMedia = (media: {
    data: Strapi4ResponseData<MediaData>;
}) => {
    return (
        useRuntimeConfig().public.strapiBaseUrl +
        media.data.attributes.formats.thumbnail.url
    );
};


const { data, error, pending } = await useAsyncData('home-page-data', () => $fetch('/api/blogs'));


const gotoBlog = (blog: Strapi4ResponseData<blogTypes.blog>) => {
    useRouter().push({ path: `/news/${blog.attributes.friendlyUrl}` });
};
</script>
