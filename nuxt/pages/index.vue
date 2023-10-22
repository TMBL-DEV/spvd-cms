<template>
    <!-- <section class="flex bg-gradient-to-r from-green-600 via-white to-white"> -->
    <section
        class="flex flex-col bg-gradient-to-b w-full from-primary to-side-color"
        v-if="!pending && data !== null"
    >
        <div class="w-10/12 mx-auto">
            <h1 class="mt-10 text-white">
                {{ data?.homePage?.data.attributes.title }}
            </h1>
        </div>
        <div
            class="w-10/12 mx-auto flex flex-col lg:flex-row-reverse mb-9"
        >
            <section class="w-full">
                <div class="sm:h-[60vh] lg:h-[80vh] w-full">
                    <NuxtImg
                    class="max-h-full mx-auto"
                    :src="
                        useBuildMediaUrl(mainImage?.data.attributes.url ?? '')
                    "
                    placeholder
                />
                </div>

                <!-- <section class="w-full h-1/4 lg:h-3/4 flex">
               
            </section>-->
            </section>
            <section class="w-full mx-auto mt-9 mb-12 lg:mb-0">
                <section
                    v-for="section of sections"
                    :key="section.id"
                    class="text-white"
                >
                    <h3>{{ section.heading }}</h3>
                    <p>{{ section.paragraph }}</p>
                </section>
            </section>
        </div>
    </section>
</template>
<script setup lang="ts">
const { data, error, pending } = await useAsyncData('home-page-data', () => $fetch('/api/pages/home'));

const mainImage = computed(() => {
    return data.value?.homePage?.data?.attributes?.mainPoint;
});

const sections = computed(() => {
    return data.value?.homePage?.data?.attributes?.aboutUsContentSections ?? [];
});

// const { data, pending, refresh, error } = await useLazyFetch<Strapi4ResponseData<blogTypes.blog>[]>('/api/blogs');

// const { data } = await useAsyncQuery(query);
</script>
