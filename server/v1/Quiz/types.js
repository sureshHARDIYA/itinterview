export const typeDef = `
  type Quiz {
    id: String!
    title: String!
    description: String
  }

  input QuizQuery {
    title: String!
    description: String
  }

  input QuizInput {
    title: String!
    description: String
  }

  input QuizCondition {
    title: String
    description: String
  }
`;

export const typeQuery = `
  findBy(where: QuizCondition): Quiz
  find(where: QuizCondition, limit: Int = 10, page: Int = 0): [Quiz]
`;

export const typeMutation = `
  deleteQuiz(id: String): Quiz
  createQuiz(input: QuizInput!): Quiz
  updateQuiz(id: String, input: QuizInput!): Quiz
`;
