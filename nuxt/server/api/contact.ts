import * as server from '../utils/serverStrapi';
import * as blogType from '../../types/blog';
import {
    Strapi4ResponseData,
    Strapi4ResponseMany,
    Strapi4ResponseSingle,
} from '@nuxtjs/strapi/dist/runtime/types';
import { z } from 'zod';
import { error } from 'console';

const ContactForm = z.object({
    email: z.coerce.string().email('incorrect-email'),
    content: z.coerce.string().min(5, 'short-content'),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body);
    
    const contactForm = ContactForm.safeParse(body);

    if (!contactForm.success) {
        throw createError(contactForm.error);
    }

    const { email, content } = contactForm.data;
    const formdata = new FormData();
    formdata.append(
        'data',
        JSON.stringify({
            email,
            content,
        })
    );

    try {
        const response = await server
            .useStrapiFetch()
            .post('/contact-entries', {
                body: formdata,
            });

        if(!response.ok){
            throw error('failed')
        }

        return true
    } catch (error) {
        return createError(`error`);
    }
});
