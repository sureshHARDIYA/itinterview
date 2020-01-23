export const typeDef = `
  type Quiz {
    id: String!
    title: String!
    description: String
    featuredImage: String
    question: [Question]
    category: [ID]
  }

  input QuizQuery {
    title: String!
    description: String
    featuredImage: String
    category: [ID]
  }

  input QuizInput {
    title: String!
    featuredImage: String
    description: String
    category: [ID]
  }

  input QuizCondition {
    id: String
    title: String
  }
`;

export const typeQuery = `
  findQuizById(id: ID!): Quiz
  findQuiz(where: QuizCondition, limit: Int = 10, page: Int = 0): [Quiz]
`;

export const typeMutation = `
  deleteQuiz(id: String): Quiz
  createQuiz(input: QuizInput!): Quiz
  updateQuiz(id: String, input: QuizInput!): Quiz
`;
