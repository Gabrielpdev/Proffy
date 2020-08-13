import IParseMailTemplate from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplate): Promise<string>;
}
