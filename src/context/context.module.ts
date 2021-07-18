import { Global, Module } from '@nestjs/common';
import { ContextProvider } from './context.provider';

@Global()
@Module({
  providers: [ContextProvider],

  exports: [ContextProvider],
})
export class ContextModule {}
