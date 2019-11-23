import Model from "./model";

export const findQuestion = (_, args) => Model.getAll(args);

export const findQuestionBy = (_, args) => Model.getBy(args.where);
