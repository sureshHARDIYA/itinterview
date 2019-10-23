export const typeDef = `
  type Question {
    id: String!
    title: String!
    description: String
    type: questionType
    selectionType: String
    answers: [String]
    correctAnswer: [String]
    correctResponse: String
    incorrectResponse: String
    explanation: String
    points:  String
  }

  enum questionType {
    TEXT
    PICTURE
  }

  enum answerType {
    SINGLE
    MULTIPLE
  }

  input QuestionQuery {
    title: String!
    description: String
    type: questionType
    selectionType: String
    answers: [String]
    correctAnswer: [String]
    correctResponse: String
    incorrectResponse: String
    explanation: String
    points:  String
  }

  input QuestionInput {
    title: String!
    description: String
    type: questionType
    selectionType: String
    answers: [String]
    correctAnswer: [String]
    correctResponse: String
    incorrectResponse: String
    explanation: String
    points:  String
  }

  input QuestionCondition {
    title: String
    description: String
    type: questionType
    selectionType: String
    answers: [String]
    correctAnswer: [String]
    correctResponse: String
    incorrectResponse: String
    explanation: String
    points:  String
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
