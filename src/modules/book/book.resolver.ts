import { Query, Resolver, ResolveProperty } from '@nestjs/graphql';

@Resolver('Book')
export class BookResolver {

  @Query('books')
  async getBook(obj, args, context, info) {
    return [];
  }

  @ResolveProperty('author')
  async getAuthor(author, args, context, info) {
    return {};
  }
}