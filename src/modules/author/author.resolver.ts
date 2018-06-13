import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';

@Resolver('Author')
export class AuthorResolver {

  @Query('authors')
  async getAuthors(obj, args, context, info) {
    return [];
  }

  @Mutation()
  addAuthor(_, { name, age }) {
    return {};
  }

  @ResolveProperty('books')
  async getBooks(author, args, context, info) {
    return [];
  }
}
