import httpStatus from "http-status";
import { NEW_ENTRY_ERRORS } from "../models/error.model";
import { newEntryErrorsCodes } from "../models/error.model";

export function errorHandler(identifier: string, error: any) {
  if (error.response && error.response.data) {
    const errorMessage = String(error?.message || error);
    error.message =
      newEntryErrorsCodes[errorMessage as NEW_ENTRY_ERRORS] ||
      NEW_ENTRY_ERRORS.GENERIC;
    error.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
  console.error(identifier, error?.response?.data || error);
  return error;
}