<template>
    <section class="flex bg-gradient-to-r from-green-600 via-white to-white">
        <div class="w-10/12 mx-auto flex">
            <section class="w-full mx-auto mt-9">
                <h1 class="mt-10">Spaargaren van Doorn</h1>
                <p class="my-6">
                   {{ data?.attributes.aboutUs }}
                </p>
            </section>
            <section class="w-full p-8">
                <img
                    src="http://strapi.spaargarenvandoorn.localhost/uploads/large_vandoorn_5679_4f2173eee5.jpg"
                    alt="aaa"
                />
            </section>
        </div>
    </section>
</template>
<script setup lang="ts">
 const { data } = useFetch('/api/pages/home');

const mediaContent = {
    banner: {
        alt: 'beautifull plant',
        src: 'large_vandoorn_5679_4f2173eee5.jpg',
    },
};

   
</script>
