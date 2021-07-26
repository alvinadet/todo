import { Global, Module } from '@nestjs/common';
import { BaseModelSubscriber } from 'src/ioc/base-model.subscriber';
import { DatabaseModule } from 'src/ioc/database.module';
import { ContextProvider } from './context.provider';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [ContextProvider, BaseModelSubscriber],

  exports: [ContextProvider],
})
export class ContextModule {}
