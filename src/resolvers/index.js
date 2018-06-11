var book = require('./book').resolvers;
var author = require('./author').resolvers;

exports.resolvers = {
  Query: {
    ...book.Query,
    ...author.Query
  },
  Mutation: {
    ...book.Mutation,
    ...author.Mutation
  }
}
