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
