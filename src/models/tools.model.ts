import Joi from "joi";

export interface IToolsRequestQuery {
  tag?: string;
  title?: string;
  description?: string;
}

export interface IPostToolsRequest {
  title: string;
  link: string;
  description?: string;
  tags: [string];
}

export const schemaPostToolsRequest = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().required(),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string()).required(),
});
