import { ApolloServer } from "apollo-server";

import "./model"
import resolvers from "./resolvers";
import typeDefs from "./schemas";

if (process.env.NODE_ENV !== "production") {
  require("dotenv");
}

const server = new ApolloServer({ 
  resolvers,
  typeDefs,
});

server.listen()
  .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
