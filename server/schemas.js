import {
  typeDef as Question,
  typeQuery as QuestionQuery,
  typeMutation as QuestionMutation
} from "./v1/Question/types";

import {
  typeDef as Category,
  typeQuery as CategoryQuery,
  typeMutation as CategoryMutation
} from "./v1/Category/types";


import {
  typeDef as Quiz,
  typeQuery as QuizQuery,
  typeMutation as QuizMutation
} from "./v1/Quiz/types";

const Schema = `
  type Query {
    ${QuestionQuery}
    ${QuizQuery}
    ${CategoryQuery}
  }

  type Mutation {
    ${QuestionMutation}
    ${QuizMutation}
    ${CategoryMutation}
  }
`;

export default [Schema, Question, Quiz, Category];
