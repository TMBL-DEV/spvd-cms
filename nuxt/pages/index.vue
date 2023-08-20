<template>
    <section class="flex bg-gradient-to-r from-green-600 via-white to-white">
        <div class="w-10/12 mx-auto flex">
            <section class="w-full mx-auto mt-9">
                <h1 class="mt-10">Spaargaren van Doorn</h1>
                <p class="my-6">
                    Sinds 1984 koesteren we natuurlijke schoonheid. Van Sri
                    Lanka tot Nederland, onze reis begon met passie en groeide
                    uit tot duurzame kwekerijen. Bladeren, planten en innovatie
                    bloeien bij ons. Ontdek ons unieke aanbod en onze
                    betrokkenheid bij lokale gemeenschappen. Samen groeien we
                    over grenzen heen.
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
// const createMediaUrl = () => {
//     const baseUrl =
// }

const mediaContent = {
    banner: {
        alt: 'beautifull plant',
        src: 'large_vandoorn_5679_4f2173eee5.jpg',
    },
};
</script>
