import { IPostToolsRequest, IToolsRequestQuery } from "../models/tools.model";
import Tools from "../config/db/schemas/tools";
import { ObjectId, Types } from "mongoose";

export const listTools = (request: IToolsRequestQuery) => {
  let filter: any;
  if(request.tag) {
    filter = { 
      tags: {
        $regex: new RegExp(request.tag)
      }
    }
  }

  return Tools.find(filter, { __v: 0});
}

export const createTools = (data: IPostToolsRequest) => Tools
  .create(data);

export const findById = (id: Types.ObjectId) => Tools
  .findOne({
    _id: id
  });

export const removeById = (id: Types.ObjectId) => Tools
  .deleteOne({
    _id: id
  });