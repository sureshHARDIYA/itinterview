import Model from "./model";

export const findQuiz = (_, args) => Model.getAll(args);

export const findQuizById = (_, args) => Model.getBy(args);
