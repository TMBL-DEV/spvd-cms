export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::contact-entry.contact-entry'],

      async afterCreate(event) {
        const { email, content } = event.result;
        console.log(email + "\n\n" + content);
        
        await strapi.plugins['email'].services.email.send({
          to: email,
          from: 'contact@spaargarenvandoorn.nl', //e.g. single sender verification in SendGrid
          subject: `Contact van ${email}`,
          text: `${email} \n\n${content}`,
          html: `${email} <br/> ${content}`,
        });

      },
    })
  }
};
