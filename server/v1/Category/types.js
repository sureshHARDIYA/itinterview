export const typeDef = `
  type Category {
    name: String!
    description: String
    featuredImage: String
    quiz: [Quiz]
  }

  input CategoryQuery {
    name: String!
    featuredImage: String
    description: String
  }

  input CategoryInput {
    name: String!
    featuredImage: String
    description: String
  }

  input CategoryCondition {
    id: String
    name: String
    description: String
  }
`;

export const typeQuery = `
  findCategoryBy(where: CategoryCondition): Category
  findCategory(where: CategoryCondition, limit: Int = 10, page: Int = 0): [Category]
`;

export const typeMutation = `
  deleteCategory(id: String): Category
  createCategory(input: CategoryInput!): Category
  updateCategory(id: String, input: CategoryInput!): Category
`;
