<template>
    <section class="flex bg-gradient-to-b from-primary to-side-color w-full">
        <div class="w-10/12 mx-auto flex flex-col gap-10 justify-center">
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
                    <UButton class="my-2" type="submit"> Submit </UButton>
                </UForm>
                <template #footer> </template>
            </UCard>
        </div>
    </section>
</template>
<script setup lang="ts">
import type { Form, FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { NuxtError } from 'nuxt/app';

const state = ref({
    email: undefined,
    password: undefined,
});
const form = ref();
const globalError = ref();

const contactForm = ref({
    email: '',
    content: '',
});

const submit = async (e: any) => {
    // form.value.clearErrors()
    const { email, content } = contactForm.value;

    const { data, error } = await useAsyncData<{}, NuxtError>('/api/contact', () =>
        $fetch('/api/contact', {
            body: {
                email,
                content,
            },
            method: 'post',
        })
    );

    if (!error.value) {
        contactForm.value.content = '';
        contactForm.value.email = '';
    
        alert('Uw bericht is verzonden ✉️');
    } else {
        const errorData = error.value.data;
        let errors: FormError[] = [];
        
        Object.keys(errorData.data).forEach((key: string) => {
            const fieldErrors: unknown[]|{_errors: string[]} = errorData.data[key];
            
            if(fieldErrors instanceof Array){
                return;
            }

            fieldErrors._errors.forEach((fieldError: string): void => {
                errors.push( {
                    path: key,
                    message: fieldError
                });
            });
        });
        
        form.value.setErrors(errors)
    }
};
</script>
