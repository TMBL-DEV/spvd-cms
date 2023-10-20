import * as server from '../utils/serverStrapi';
import { z } from 'zod';

const ContactForm = z.object({
    email: z.coerce.string().min(1, 'Mist mail').email('incorrecte email'),
    content: z.coerce.string().min(5, 'Te weinig ingevuld (minimaal 5 characters)'),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);    
    const contactForm = ContactForm.safeParse(body);

    if (!contactForm.success) {  
        console.log(contactForm.error.format());
        // setResponseStatus(event, 400, "reee");
        return sendError(event, createError({message: 'Contact Formulier incorrect', data: contactForm.error.format(), statusCode: 400, statusMessage: 'help me'}));
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

    return server
    .useStrapiFetch()
    .post('/contact-entries', {
        body: formdata,
    });
});
