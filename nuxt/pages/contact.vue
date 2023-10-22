<template>
    <section class="flex bg-gradient-to-b from-primary to-side-color w-full">
        <div
            class="w-full md:w-10/12 mx-auto flex flex-col gap-10 justify-center"
        >
            <UCard
                class="w-full"
                :ui="{
                    base: 'p-5',
                    ring: '',
                    divide: 'divide-y divide-gray-200',
                    header: {},
                    body: {
                        padding: '',
                        base: 'divide-y divide-gray-200 p-5',
                    },
                    footer: { padding: 'p-4' },
                }"
            >
                <template #header>
                    <h1 class="text-center">Contact met ons</h1>
                </template>
                <UForm ref="form" :state="state" @submit="submit">
                    <UFormGroup class="my-2" label="Email" name="email">
                        <UInput
                            v-model="contactForm.email"
                            placeholder="ilove@plants.nl"
                        />
                    </UFormGroup>
                    <UFormGroup label="Content" name="content">
                        <UTextarea
                            v-model="contactForm.content"
                            name="input"
                            placeholder="content"
                            :rows="8"
                            class="my-2"
                        />
                    </UFormGroup>
                    <input type="text" hidden />
                    <UButton
                        class="my-2 w-full md:w-auto text-center"
                        type="submit"
                    >
                        <p class="w-full">Submit</p>
                    </UButton>
                </UForm>
                <template #footer> </template>
            </UCard>
        </div>
    </section>
</template>
<script setup lang="ts">
import type {
    Form,
    FormError,
    FormSubmitEvent,
} from '@nuxt/ui/dist/runtime/types';
import { NuxtError } from 'nuxt/app';

const state = ref({
    email: undefined,
    password: undefined,
});
const form = ref();

const contactForm = ref({
    email: '',
    content: '',
    other: null,
});

const toast = useToast();

const submit = async (e: any) => {
    const { email, content } = contactForm.value;

    if (contactForm.value.other !== null) {
        toast.add({ title: 'Ons systeem verdenkt u van een robot te zijn 🤖' });
        return;
    }

    const { data, error } = useCsrfFetch('/api/contact', {
        body: {
            email,
            content,
        },
        method: 'post',
    });

    if (!error.value) {
        contactForm.value.content = '';
        contactForm.value.email = '';

        toast.add({ title: 'Contact bericht is verzonden ✉️' });
        return;
    }
    
    const errorData = error.value.data;
    let errors: FormError[] = [];

    Object.keys(errorData.data).forEach((key: string) => {
        const fieldErrors: unknown[] | { _errors: string[] } =
            errorData.data[key];

        if (fieldErrors instanceof Array) {
            return;
        }

        fieldErrors._errors.forEach((fieldError: string): void => {
            errors.push({
                path: key,
                message: fieldError,
            });
        });
    });

    form.value.setErrors(errors);
    toast.add({ title: 'contact bericht niet verzonden ❌' });
};
</script>
