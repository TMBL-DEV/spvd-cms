<template>
    <section v-if="pending">loading</section>
    <section class="w-10/12 mx-auto mt-8" v-if="results.length && blog">
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
        <section v-if="parsedMarkdown !== null && !pending" class="my-4 w-full max-w-full">
            <pre id="markdown-pre" class="whitespace-pre-wrap">
                <ContentRendererMarkdown :value="parsedMarkdown"/>
            </pre>
        </section>
    </section>
</template>
<script setup lang="ts">
import { Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types';
import * as blogTypes from '../../types/blog';
import { MediaData } from '../../types/strapi';
//@ts-ignore
import markdownParser from '@nuxt/content/transformers/markdown'
// import markdownParser from "@nuxt/content/transformers/markdown";

// definePageMeta({
//     middleware: ['valid-news-slug']
// });

const { find } = usePublicStrapi();
const currentPath: string = useRoute().path;
const parsedMarkdown = ref<any>(null);

const { data, pending, refresh, error } = await useLazyAsyncData(
    'blogs',
    () => {
        useStrapiAuth().setToken(useRuntimeConfig().public.strapiToken);
        return find<blogTypes.blog>('blogs', {
            populate: ['thumbnail'],
            filters: {
                friendlyUrl: currentPath.split('/news/').pop(),
            },
        });
    },
    { server: false }
);

const getThumbnailFromMedia = (media: {
    data: Strapi4ResponseData<MediaData>;
}) => {
    return (
        useRuntimeConfig().public.strapiBaseUrl +
        media.data.attributes.formats.medium.url
    );
};

const results = computed(() => {
    if (!pending.value && data.value && !data.value.data.length) {
        showError({
            statusCode: 404,
            statusMessage: 'gezochte nieuws item is niet aanwezig',
        });
        return [];
    }

    return data.value?.data ?? [];
});

const blog = computed(() => {
    const key = results.value.length - 1;

    if (key < 0) {
        return null;
    }
    const tada = results.value[key];

    markdownParser.parse('news', tada.attributes.content).then((res: any) => {
        console.log(res);
        
        parsedMarkdown.value = res;
    })

    return results.value[key];
});

onMounted(() => {
    watch(pending, () => {
        const section = document.getElementById('thumbnail-target');
        console.log(section);
        
        if (blog.value && blog.value.attributes.thumbnail && section) {
            const url = getThumbnailFromMedia(blog.value.attributes.thumbnail);

            // Set the background image using JavaScript
            section.style.backgroundImage = `url('${url}')`;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center center';
        }
    });
});


// find<blog>('blogs', {
//     filters: {
//         'friendlyUrl': ''
//     }
// }).then((res) => {
//     res.data.forEach((blog) => {
//         console.log(blog.attributes.publishedAt);
//     });
// });
</script>
<style scoped>


h1{
    -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: white;
}
</style>