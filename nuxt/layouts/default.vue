<template>
    <section class="flex flex-col min-h-screen">
        <header class="h-24 w-full flex">
        <div class="h-full w-10/12 mx-auto flex justify-between">
            <div class="w-4/12 my-auto">
                logo
            </div>

            <div class="w-8/12 justify-end flex flex-row my-auto">
                <div class="mx-2">Home</div>
                <div class="mx-2">Assortiment</div>
                <div class="mx-2">Contact</div>
                <div class="mx-2">Floriday</div>
            </div>
        </div>
        </header>
        <main class="flex grow">
            <slot />
        </main>
        <footer class="h-24 w-full text-center items-center flex justify-center">
            <span>© Spaargaren van doorn BV 2023</span>
        </footer>
    </section>
</template>
