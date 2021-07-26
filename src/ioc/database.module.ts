import { Module } from '@nestjs/common';
import { BaseModelSubscriber } from './base-model.subscriber';

@Module({
  providers: [BaseModelSubscriber],
  exports: [BaseModelSubscriber],
})
export class DatabaseModule {}
