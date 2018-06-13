import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { AuthorService } from './author.service';

@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
  ) {}
  @Query('authors')
  async getAuthors(obj, args, context, info) {
    return [];
  }

  @Mutation()
  async createAuthor(_, {author, token}) {
    return await this.authorService.createAuthor(author, token);
  }

  @ResolveProperty('books')
  async getBooks(author, args, context, info) {
    return [];
  }
}
