import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { AuthorResolver } from './resolvers/author';
import { BookResolver } from './resolvers/book';

@Module({
  imports: [GraphQLModule, AuthorResolver, BookResolver],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const delegates = this.graphQLFactory.createDelegates();
    const schema = this.graphQLFactory.createSchema({
      typeDefs,
      resolvers: delegates as any,
    });

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
export class AppModule {}
