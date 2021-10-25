import { Global, Module } from '@nestjs/common';
import { BaseModelSubscriber } from '../ioc/base-model.subscriber';
import { DatabaseModule } from '../ioc/database.module';
import { ContextProvider } from './context.provider';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [ContextProvider, BaseModelSubscriber],

  exports: [ContextProvider],
})
export class ContextModule {}
