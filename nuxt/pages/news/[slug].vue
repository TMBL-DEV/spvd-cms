<template>
    <section class="w-10/12 mx-auto mt-8" v-if="blog">
        <section
            id="thumbnail-target"
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
        <section v-if="parsedMarkdown !== null" class="my-4 w-full max-w-full">
            <pre id="markdown-pre" class="whitespace-pre-wrap">
                <ContentRendererMarkdown :value="parsedMarkdown"/>
            </pre>
        </section>
    </section>
</template>
<script setup lang="ts">
import { Strapi4Response, Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types';
import { MediaData } from '../../types/strapi';
//@ts-ignore
import markdownParser from '@nuxt/content/transformers/markdown';
import * as blogType from '../../types/blog';

definePageMeta({
    middleware: ['valid-news-slug'],
});

const parsedMarkdown = ref<any>(null);
const friendlyUrl: string = useRoute().path.replace('/news/', '');
const blog = useState<Strapi4ResponseData<blogType.blog>>(friendlyUrl);

markdownParser.parse('news', blog.value.attributes.content).then((res: any) => {
    parsedMarkdown.value = res;
});


const getThumbnailFromMedia = (media: {
    data: Strapi4ResponseData<MediaData>;
}) => {
    return (
        useRuntimeConfig().public.strapiBaseUrl +
        media.data.attributes.formats.medium.url
    );
};

const setBackgroundThumbnail = () => {
    const section = document.getElementById('thumbnail-target');

    if (blog.value && blog.value.attributes.thumbnail && section) {
        const url = getThumbnailFromMedia(blog.value.attributes.thumbnail);

        // Set the background image using JavaScript
        section.style.backgroundImage = `url('${url}')`;
        section.style.backgroundSize = 'cover';
        section.style.backgroundPosition = 'center center';
    }
};

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
