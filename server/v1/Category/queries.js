import Model from "./model";

export const findCategory = (_, args) => Model.getAll(args);

export const findCategoryBy = (_, args) => Model.getBy(args.where);
