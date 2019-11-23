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
    quiz: Quiz
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
    quiz: String!
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

  input QuestionUpdateInput {
    title: String
    quiz: String
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
    quiz: String
  }
`;

export const typeQuery = `
  findQuestionBy(where: QuestionCondition): Question
  findQuestion(where: QuestionCondition, limit: Int = 10, page: Int = 0): [Question]
`;

export const typeMutation = `
  deleteQuestion(id: String): Question
  createQuestion(input: QuestionInput!): Question
  updateQuestion(id: String, input: QuestionUpdateInput!): Question
`;
