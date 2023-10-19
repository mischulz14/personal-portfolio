import { gql } from 'apollo-server';

export const typeDefs = gql`
  """
  A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the date-time format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
  """
  scalar Date

  type Query {
    getFeedback: [Feedback!]!
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback!
  }

  "A feedback that can be written on the page"
  type Feedback {
    id: ID!
    feedback: String!
    createdAt: Date!
  }

  input CreateFeedbackInput {
    feedback: String!
  }
`;
