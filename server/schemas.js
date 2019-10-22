import {
  typeDef as Question,
  typeQuery as QuestionQuery,
  typeMutation as QuestionMutation,
} from "./v1/Question/types";

const Schema = `
  type Query {
    ${QuestionQuery}
  }

  type Mutation {
    ${QuestionMutation}
  }
`;

export default [Schema, Question];
