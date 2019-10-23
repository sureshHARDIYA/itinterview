import Model from "./model";

export const createQuestion = (_, args) => Model.createData(args.input);

export const updateQuestion = (_, args) =>
  Model.updateData(args.id, args.input);

export const deleteQuestion = (_, args) => Model.deleteData(args.id);
