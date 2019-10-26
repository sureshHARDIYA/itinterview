import {
  typeDef as Question,
  typeQuery as QuestionQuery,
  typeMutation as QuestionMutation
} from "./v1/Question/types";

import {
  typeDef as Quiz,
  typeQuery as QuizQuery,
  typeMutation as QuizMutation
} from "./v1/Quiz/types";

const Schema = `
  type Query {
    ${QuestionQuery}
    ${QuizQuery}
  }

  type Mutation {
    ${QuestionMutation}
    ${QuizMutation}
  }
`;

export default [Schema, Question, Quiz];
