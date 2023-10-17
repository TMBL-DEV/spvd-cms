<template>
    <!-- <section class="flex bg-gradient-to-r from-green-600 via-white to-white"> -->
    <section class="flex bg-gradient-to-b from-primary to-secondary">
        <div class="w-10/12 mx-auto flex">
            <section class="w-full mx-auto mt-9">
                <h1 class="mt-10 text-white">Spaargaren van Doorn</h1>
                <p class="my-6 text-white">
                   {{ data?.attributes.aboutUs }}
                </p>
            </section>
            <section class="w-full ">
                <img
                    src="http://strapi.spaargarenvandoorn.localhost/uploads/large_vandoorn_5679_transformed_e7e34afbdb.png"
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
