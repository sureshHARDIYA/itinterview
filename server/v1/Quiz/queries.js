import Model from "./model";

export const findQuiz = (_, args) => Model.getAll(args);

export const findQuizBy = (_, args) => Model.getBy(args.where);
