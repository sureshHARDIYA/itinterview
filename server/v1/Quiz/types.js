export const typeDef = `
  type Quiz {
    id: String!
    title: String!
    description: String
    question: [Question]
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
  findQuizBy(where: QuizCondition): Quiz
  findQuiz(where: QuizCondition, limit: Int = 10, page: Int = 0): [Quiz]
`;

export const typeMutation = `
  deleteQuiz(id: String): Quiz
  createQuiz(input: QuizInput!): Quiz
  updateQuiz(id: String, input: QuizInput!): Quiz
`;
