import Model from "./model";

export const createQuiz = (_, args) => Model.createData(args.input);

export const updateQuiz = (_, args) =>
  Model.updateData(args.id, args.input);

export const deleteQuiz = (_, args) => Model.deleteData(args.id);
