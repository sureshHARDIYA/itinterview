export const typeDef = `
  type Question {
    id: String!
    title: String!
  }
  
  input QuestionQuery {
    title: String!
  }

  input QuestionInput {
    title: String!
  }

  input QuestionCondition {
    title: String
  }
`;

export const typeQuery = `
  findBy(where: QuestionCondition): Question
  find(where: QuestionCondition, limit: Int = 10, page: Int = 0): [Question]
`;

export const typeMutation = `
  deleteQuestion(id: String): Question
  createQuestion(input: QuestionInput!): Question
  updateQuestion(id: String, input: QuestionInput!): Question
`;
