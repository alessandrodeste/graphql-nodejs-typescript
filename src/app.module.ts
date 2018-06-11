import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({path: '/graphiql', method: RequestMethod.GET} as any)
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({path: '/graphql', method: RequestMethod.ALL} as any);
  }
}
export class AppModule {}
