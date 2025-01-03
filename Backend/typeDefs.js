import { buildSchema } from "graphql";

const typeDefs = buildSchema(`
    type Series {
        name: String!
        color: String!
        data: [Float!]!
    }
        
    type Chart {
        type: String!
        title: String
        yAxisTitle: String
        dataLabelPrefix: String
        dataLabelSuffix: String
        series: [Series!]!
        categories: [String!]!
    }
        
    type Query {
        getChartData(image: String!, fileType: String!): Chart!
    }
`);

export default typeDefs;