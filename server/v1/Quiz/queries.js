import Model from "./model";

export const find = (_, args) => Model.getAll(args);

export const findBy = (_, args) => Model.getBy(args.where);
