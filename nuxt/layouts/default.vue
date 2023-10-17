<template>
    <section class="flex flex-col min-h-screen">
        <header class="h-24 w-full flex bg-white opacity-90 rounded-b-xl z-10 fixed border-b-2 border-b-slate-200">
            <div class="h-full w-10/12 mx-auto flex justify-between">
                <div class="w-4/12 my-auto">
                    <img class="w-auto h-20" :src="navigation.logo.href" :alt="navigation.logo.text">
                </div>

                <div class="w-8/12 justify-end flex flex-row my-auto">
                    <NuxtLink class="mx-2 hover:text-green-700" v-for="(item, index) of navigation.items" :key="index" :to="item.link">
                        {{ item.text }}
                    </NuxtLink>
                </div>
            </div>
        </header>
        <main class="flex grow mt-24 mx-auto w-full">
            <slot />
        </main>
        <footer
            class="h-24 w-full text-center items-center flex justify-center rounded-xl bg-white bg-opacity-90 z-10"
        >
            <div class="">
                <p class="text-black opacity-100">© Spaargaren van doorn BV 2023</p>
            </div>
        </footer>
    </section>
</template>
<script setup lang="ts">
const navigation = reactive({
    logo: {
        href: '/public/SpadoLogo.png',
        text: 'Spaargaren van Doorn',
    },
    items: [
        {
            text: 'Home',
            link: '/',
        },
        {
            text: 'Assortiment',
            link: '/',
        },
        {
            text: 'Nieuws',
            link: '/news',
        },
        {
            text: 'Contact',
            link: '/contact',
        },
        {
            text: 'Floriday',
            link: '/',
        },

    ],
});
</script>
