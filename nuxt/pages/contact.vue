<template>
    <section class="flex bg-gradient-to-b from-primary to-secondary w-full">
        <div class="w-10/12 mx-auto flex flex-col gap-10">
            <section class="w-full mx-auto mt-9">
                <h1 class="mt-10 text-white text-center">Contact met ons</h1>
            </section>
            <form
                @submit.prevent="submit"
                class="rounded-lg bg-white p-4 flex flex-col gap-4"
            >
                <div class="">
                    <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >email adres</label
                    >
                    <input
                        v-model="contactForm.email"
                        type="email"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="we@loveplants.nl"
                        required
                    />
                </div>
                <div class="">
                    <label
                        for="message"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Bericht</label
                    >
                    <textarea
                        v-model="contactForm.content"
                        id="message"
                        rows="6"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Leave a comment..."
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary hover:bg-secondary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                    >
                        Send message
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
<script setup lang="ts">
const contactForm = ref({
    email: '',
    content: '',
});

const submit = async (e: any) => {
    const { email, content } = contactForm.value;

    const { data, error } = await useAsyncData('/api/contact', () =>
        $fetch('/api/contact', {
            body: {
               email,
               content
            },
            method: 'post',
        })
    );

    console.log(data);

    contactForm.value.content = '';
    contactForm.value.email = '';

    if(!error.value){
        alert('Uw bericht is verzonden ✉️')
    }else{
        alert(error.value);
    }
};
</script>
