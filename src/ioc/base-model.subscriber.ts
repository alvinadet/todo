import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ContextProvider } from 'src/context/context.provider';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

@Injectable()
@EventSubscriber()
export class BaseModelSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectConnection()
    readonly connection: Connection,
    @Inject(ContextProvider)
    private appContext: ContextProvider,
  ) {
    connection.subscribers.push(this);
  }

  private getCurrentUserId() {
    const { user } = this.appContext;

    if (!user) {
      throw new Error('Failed to resolve current user.');
    }

    return user.id;
  }

  beforeInsert(e: InsertEvent<any>) {
    if (e.metadata.columns.some((c) => c.propertyName === 'createdAt')) {
      e.entity.createdAt = new Date();
    }

    if (e.metadata.columns.some((c) => c.propertyName === 'createdBy')) {
      const currentUsername = this.getCurrentUserId();
      e.entity.createdBy = currentUsername;
    }
  }

  beforeUpdate(e: UpdateEvent<any>) {
    if (!e.entity) {
      return;
    }

    if (e.entity.deleted) {
      const currentUsername = this.getCurrentUserId();
      e.entity.deletedAt = new Date();
      e.entity.deletedBy = currentUsername;
    } else {
      if (e.metadata.columns.some((c) => c.propertyName === 'updatedAt')) {
        e.entity.updatedAt = new Date();
      }
      if (e.metadata.columns.some((c) => c.propertyName === 'updatedBy')) {
        const currentUsername = this.getCurrentUserId();
        e.entity.updatedBy = currentUsername;
      }
    }
  }

  beforeRemove(e: RemoveEvent<any>) {
    if (e.metadata.columns.some((c) => c.propertyName === 'deletedAt')) {
      throw new Error('Immortal model can not be deleted.');
    }
  }
}
