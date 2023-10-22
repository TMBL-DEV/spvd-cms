<template>
    <article class="bg-gradient-to-b from-primary to-side-color w-full">
        <section class="w-10/12 mx-auto mt-8" v-if="blog">
        <section
            ref="thumbnailTarget"
            class="mx-auto w-full h-60 bg-slate-50 bg-opacity-70 border-white border-2 rounded-lg flex justify-center"
        >
            <div
                class="bg-opacity-30 bg-white w-full h-full flex justify-center"
            >
                <h1 class="text-3xl my-auto">
                    {{ blog.attributes.title }}
                </h1>
            </div>
        </section>
        <section v-if="parsedMarkdown !== null" class="my-4 w-full max-w-full text-white">
            <pre id="markdown-pre" class="whitespace-pre-wrap">
                <ContentRendererMarkdown :value="parsedMarkdown"/>
            </pre>
        </section>
    </section>
    </article>
</template>
<script setup lang="ts">
import {
    Strapi4Response,
    Strapi4ResponseData,
} from '@nuxtjs/strapi/dist/runtime/types';
import { MediaData } from '../../types/strapi';
//@ts-ignore
import markdownParser from '@nuxt/content/transformers/markdown';
import * as blogType from '../../types/blog';

definePageMeta({
    middleware: ['valid-news-slug'],
});

const thumbnailTarget = ref();
const parsedMarkdown = ref<any>(null);
const friendlyUrl: string = useRoute().path.replace('/news/', '');
const blog = useState<Strapi4ResponseData<blogType.blog>>(friendlyUrl);
const parsedMD = await markdownParser.parse(
    'news',
    blog.value.attributes.content
);

parsedMarkdown.value = parsedMD;

const getThumbnailFromMedia = (media: {
    data: Strapi4ResponseData<MediaData>;
}) => {
    return (
        useRuntimeConfig().public.strapiBaseUrl +
        media.data.attributes.formats.medium.url
    );
};

const setBackgroundThumbnail = () => {
    // const section = document.getElementById('thumbnail-target');

    if (blog.value && blog.value.attributes.thumbnail) {
        const url = getThumbnailFromMedia(blog.value.attributes.thumbnail);

        // Set the background image using JavaScript
        thumbnailTarget.value.style.backgroundImage = `url('${url}')`;
        thumbnailTarget.value.style.backgroundSize = 'cover';
        thumbnailTarget.value.style.backgroundPosition = 'center center';
    }
};


// setBackgroundThumbnail();
onMounted(() => {
    setBackgroundThumbnail();
});
</script>
<style scoped>
h1 {
    -webkit-text-stroke-width: 0.2px;
    -webkit-text-stroke-color: white;
}
</style>
