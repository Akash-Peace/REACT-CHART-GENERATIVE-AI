import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import fs from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchema } from 'graphql';

dotenv.config();

const port = process.env.PORT || 8426;
const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://image-to-chart.web.app/' : '*',
  methods: ['POST', 'OPTIONS'],
  credentials: true
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

if (process.env.NODE_ENV === 'development') {
  const schemaSDL = printSchema(schema);
  fs.writeFileSync('schema.graphql', schemaSDL);
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '5mb' }));

app.use(
  "/",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`--> Server running on port ${port} ...`);
});
