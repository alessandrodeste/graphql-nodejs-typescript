import { Module } from '@nestjs/common';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [],
  providers: [AuthorResolver],
})
export class AuthorModule {}