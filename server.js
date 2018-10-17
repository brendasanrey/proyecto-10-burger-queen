const { ApolloServer, gql } = require("apollo-server");

const lista = [
  { tarea: "leer", persona: "Adri" },
  { tarea: "comer", persona: "Copelia" },
  { tarea: "caminar", persona: "Rocio" },
  { tarea: "saltar", persona: "Linda" }
];

const typeDefs = gql`
  type Lista {
    tarea: String
    persona: String
  }

  type Query {
    getLista: [Lista]
  }

  type Mutation {
    addLista(tarea: String, persona: String): Lista
  }
`;

const resolvers = {
  Query: {
    getLista: () => {
      return lista;
    }
  },
  Mutation: {
    addLista: (_, args) => {
      const nuevalista = { tarea: args.tarea, persona: args.persona };
      lista.push(nuevalista);
      return nuevalista;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log("Servidor activo ", url);
});
