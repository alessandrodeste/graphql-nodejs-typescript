import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

@Module({
  imports: [GraphQLModule, AuthorModule, BookModule],
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

    addMockFunctionsToSchema({ schema, mocks });

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
export class AppModule {}
