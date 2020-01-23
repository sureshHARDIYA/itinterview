import Model from "./model";

export const createCategory = (_, args) => Model.createData(args.input);

export const updateCategory = (_, args) =>
  Model.updateData(args.id, args.input);

export const deleteCategory = (_, args) => Model.deleteData(args.id);
