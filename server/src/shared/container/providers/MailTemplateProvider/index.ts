import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlebarsMailTemplateProvide from './implementations/HandlebarsMailTemplateProvide';

const providers = {
  handlebars: HandlebarsMailTemplateProvide,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
