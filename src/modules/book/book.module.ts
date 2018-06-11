import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';

@Module({
  imports: [],
  providers: [BookResolver],
})
export class BookModule {}